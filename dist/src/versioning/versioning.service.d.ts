import { PrismaService } from '../common/prisma/prisma.service';
export declare class VersioningService {
    private prisma;
    constructor(prisma: PrismaService);
    createSnapshot(tenantId: string, entityType: string, entityId: string, newData: any, actorId: string, eventId?: string): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
    }>;
    getHistory(tenantId: string, entityType: string, entityId: string): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
    }[]>;
    getVersion(id: string): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
    }>;
    rollback(tenantId: string, entityType: string, entityId: string, targetVersion: number): Promise<import("@prisma/client/runtime/client").JsonValue>;
}
