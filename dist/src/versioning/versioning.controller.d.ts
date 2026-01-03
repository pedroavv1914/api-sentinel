import { VersioningService } from './versioning.service';
export declare class VersioningController {
    private readonly versioningService;
    constructor(versioningService: VersioningService);
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
    getSnapshot(id: string): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: string;
        createdAt: Date;
        tenantId: string;
        appId: string | null;
        entityType: string;
        entityId: string;
        version: number;
    }>;
    getRollbackData(tenantId: string, entityType: string, entityId: string, version: number): Promise<import("@prisma/client/runtime/client").JsonValue>;
}
