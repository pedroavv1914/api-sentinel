import { VersioningService } from './versioning.service';
export declare class VersioningController {
    private readonly versioningService;
    constructor(versioningService: VersioningService);
    getHistory(tenantId: string, entityType: string, entityId: string): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
        diff: import("@prisma/client/runtime/client").JsonValue | null;
        createdBy: string;
        eventId: string | null;
    }[]>;
    getSnapshot(id: string): Promise<{
        id: string;
        createdAt: Date;
        data: import("@prisma/client/runtime/client").JsonValue;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
        diff: import("@prisma/client/runtime/client").JsonValue | null;
        createdBy: string;
        eventId: string | null;
    }>;
    getRollbackData(tenantId: string, entityType: string, entityId: string, version: number): Promise<import("@prisma/client/runtime/client").JsonValue>;
}
