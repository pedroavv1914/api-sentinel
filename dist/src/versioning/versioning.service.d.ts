import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class VersioningService {
    private prisma;
    constructor(prisma: PrismaService);
    createSnapshot(tenantId: string, entityType: string, entityId: string, newData: any, actorId: string, eventId?: string): Promise<{
        id: string;
        createdAt: Date;
        data: Prisma.JsonValue;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
        diff: Prisma.JsonValue | null;
        createdBy: string;
        eventId: string | null;
    }>;
    getHistory(tenantId: string, entityType: string, entityId: string): Promise<{
        id: string;
        createdAt: Date;
        data: Prisma.JsonValue;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
        diff: Prisma.JsonValue | null;
        createdBy: string;
        eventId: string | null;
    }[]>;
    getVersion(id: string): Promise<{
        id: string;
        createdAt: Date;
        data: Prisma.JsonValue;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
        diff: Prisma.JsonValue | null;
        createdBy: string;
        eventId: string | null;
    }>;
    rollback(tenantId: string, entityType: string, entityId: string, targetVersion: number): Promise<Prisma.JsonValue>;
}
