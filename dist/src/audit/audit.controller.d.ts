import { AuditService } from './audit.service';
import { CreateAuditEventDto } from './dto/create-audit-event.dto';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    create(createAuditEventDto: CreateAuditEventDto): Promise<{
        event: {
            id: string;
            tenantId: string;
            appId: string | null;
            actorType: import("@prisma/client").$Enums.ActorType;
            actorId: string;
            action: string;
            entityType: string;
            entityId: string;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            before: import("@prisma/client/runtime/client").JsonValue | null;
            after: import("@prisma/client/runtime/client").JsonValue | null;
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
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        before: import("@prisma/client/runtime/client").JsonValue | null;
        after: import("@prisma/client/runtime/client").JsonValue | null;
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
