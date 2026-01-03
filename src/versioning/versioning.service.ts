import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { compare } from 'fast-json-patch';
import { Prisma } from '@prisma/client';

@Injectable()
export class VersioningService {
  constructor(private prisma: PrismaService) {}

  async createSnapshot(
    tenantId: string,
    entityType: string,
    entityId: string,
    newData: any,
    actorId: string,
    eventId?: string,
  ) {
    // 1. Get latest version
    const latestSnapshot = await this.prisma.entitySnapshot.findFirst({
      where: {
        tenantId,
        entityType,
        entityId,
      },
      orderBy: {
        version: 'desc',
      },
    });

    let version = 1;
    let diff = null;

    if (latestSnapshot) {
      version = latestSnapshot.version + 1;
      // Calculate diff from previous version to new data
      // Note: fast-json-patch compare(old, new)
      if (
        latestSnapshot.data &&
        typeof latestSnapshot.data === 'object' &&
        newData &&
        typeof newData === 'object'
      ) {
        diff = compare(
          latestSnapshot.data as unknown as Record<string, any>,
          newData as Record<string, any>,
        );
      }
    }

    // 2. Create new snapshot
    const createData: any = {
      tenantId,
      entityType,
      entityId,
      version,
      data: newData as Prisma.InputJsonValue,
      diff: diff ? (diff as unknown as Prisma.InputJsonValue) : Prisma.JsonNull,
      createdBy: actorId,
      eventId,
    };

    const snapshot = await this.prisma.entitySnapshot.create({
      data: createData as Prisma.EntitySnapshotUncheckedCreateInput,
    });

    return snapshot;
  }

  async getHistory(tenantId: string, entityType: string, entityId: string) {
    return this.prisma.entitySnapshot.findMany({
      where: {
        tenantId,
        entityType,
        entityId,
      },
      orderBy: {
        version: 'desc',
      },
    });
  }

  async getVersion(id: string) {
    const snapshot = await this.prisma.entitySnapshot.findUnique({
      where: { id },
    });
    if (!snapshot) {
      throw new NotFoundException('Snapshot not found');
    }
    return snapshot;
  }

  async rollback(
    tenantId: string,
    entityType: string,
    entityId: string,
    targetVersion: number,
  ) {
    // Simply finding the snapshot at that version gives us the full state
    // because we store full snapshots (MVP strategy).
    // If we stored only diffs, we would need to reconstruct.

    const snapshot = await this.prisma.entitySnapshot.findFirst({
      where: {
        tenantId,
        entityType,
        entityId,
        version: targetVersion,
      },
    });

    if (!snapshot) {
      throw new NotFoundException(
        `Version ${targetVersion} not found for this entity`,
      );
    }

    return snapshot.data;
  }
}
