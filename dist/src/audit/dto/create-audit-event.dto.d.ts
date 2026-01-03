export declare enum ActorType {
    USER = "USER",
    SERVICE = "SERVICE"
}
export declare class CreateAuditEventDto {
    tenantId: string;
    appId?: string;
    actorType: ActorType;
    actorId: string;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Record<string, any>;
    before?: Record<string, any>;
    after?: Record<string, any>;
    idempotencyKey?: string;
}
