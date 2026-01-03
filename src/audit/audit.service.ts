import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateAuditEventDto } from './dto/create-audit-event.dto';
import * as crypto from 'crypto';
import { ActorType, Prisma } from '@prisma/client';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAuditEventDto) {
    // 1. Idempotency Check
    if (dto.idempotencyKey) {
      const existing = await this.prisma.auditEvent.findFirst({
        where: { idempotencyKey: dto.idempotencyKey },
      });
      if (existing) {
        return { event: existing, status: 'IDEMPOTENT_EXISTING' };
      }
    }

    // 2. Get Previous Hash (for Chain)
    // Chain scope: Tenant
    const lastEvent = await this.prisma.auditEvent.findFirst({
      where: { tenantId: dto.tenantId },
      orderBy: { occurredAt: 'desc' },
    });

    const prevHash = lastEvent?.chainHash || 'GENESIS';

    // 3. Prepare Data & Calculate Hashes
    const occurredAt = new Date();
    
    // Normalize payload for hashing
    // We include key fields. In a real system, we'd use a canonical JSON stringify.
    const payloadForHash = JSON.stringify({
      tenantId: dto.tenantId,
      appId: dto.appId,
      actorType: dto.actorType,
      actorId: dto.actorId,
      action: dto.action,
      entityType: dto.entityType,
      entityId: dto.entityId,
      metadata: dto.metadata,
      before: dto.before,
      after: dto.after,
      occurredAt: occurredAt.toISOString(),
      prevHash: prevHash,
    });

    const eventHash = crypto.createHash('sha256').update(payloadForHash).digest('hex');
    const chainHash = crypto.createHash('sha256').update(prevHash + eventHash).digest('hex');

    // 4. Persist
    const event = await this.prisma.auditEvent.create({
      data: {
        tenantId: dto.tenantId,
        appId: dto.appId,
        actorType: dto.actorType as ActorType,
        actorId: dto.actorId,
        action: dto.action,
        entityType: dto.entityType,
        entityId: dto.entityId,
        metadata: dto.metadata ?? Prisma.JsonNull,
        before: dto.before ?? Prisma.JsonNull,
        after: dto.after ?? Prisma.JsonNull,
        idempotencyKey: dto.idempotencyKey,
        occurredAt: occurredAt,
        eventHash: eventHash,
        prevEventHash: prevHash,
        chainHash: chainHash,
      },
    });

    return { event, status: 'CREATED' };
  }
  
  async findAll() {
      return this.prisma.auditEvent.findMany({
          orderBy: { occurredAt: 'desc' },
          take: 100,
      });
  }
}
