import { PrismaService } from '../common/prisma/prisma.service';
import { CreateAuditEventDto } from './dto/create-audit-event.dto';
import { Prisma } from '@prisma/client';
import { VersioningService } from '../versioning/versioning.service';
export declare class AuditService {
    private prisma;
    private versioningService;
    constructor(prisma: PrismaService, versioningService: VersioningService);
    create(dto: CreateAuditEventDto): Promise<{
        event: {
            id: string;
            tenantId: string;
            appId: string | null;
            actorType: import("@prisma/client").$Enums.ActorType;
            actorId: string;
            action: string;
            entityType: string;
            entityId: string;
            metadata: Prisma.JsonValue | null;
            before: Prisma.JsonValue | null;
            after: Prisma.JsonValue | null;
            idempotencyKey: string | null;
            correlationId: string | null;
            occurredAt: Date;
            ip: string | null;
            userAgent: string | null;
            eventHash: string;
            prevEventHash: string | null;
            chainHash: string | null;
        };
        status: string;
    }>;
    findAll(): Promise<{
        id: string;
        tenantId: string;
        appId: string | null;
        actorType: import("@prisma/client").$Enums.ActorType;
        actorId: string;
        action: string;
        entityType: string;
        entityId: string;
        metadata: Prisma.JsonValue | null;
        before: Prisma.JsonValue | null;
        after: Prisma.JsonValue | null;
        idempotencyKey: string | null;
        correlationId: string | null;
        occurredAt: Date;
        ip: string | null;
        userAgent: string | null;
        eventHash: string;
        prevEventHash: string | null;
        chainHash: string | null;
    }[]>;
}
