"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const crypto = __importStar(require("crypto"));
const client_1 = require("@prisma/client");
const versioning_service_1 = require("../versioning/versioning.service");
let AuditService = class AuditService {
    prisma;
    versioningService;
    constructor(prisma, versioningService) {
        this.prisma = prisma;
        this.versioningService = versioningService;
    }
    async create(dto) {
        if (dto.idempotencyKey) {
            const existing = await this.prisma.auditEvent.findFirst({
                where: { idempotencyKey: dto.idempotencyKey },
            });
            if (existing) {
                return { event: existing, status: 'IDEMPOTENT_EXISTING' };
            }
        }
        const lastEvent = await this.prisma.auditEvent.findFirst({
            where: { tenantId: dto.tenantId },
            orderBy: { occurredAt: 'desc' },
        });
        const prevHash = lastEvent?.chainHash || 'GENESIS';
        const occurredAt = new Date();
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
        const eventHash = crypto
            .createHash('sha256')
            .update(payloadForHash)
            .digest('hex');
        const chainHash = crypto
            .createHash('sha256')
            .update(prevHash + eventHash)
            .digest('hex');
        const event = await this.prisma.auditEvent.create({
            data: {
                tenantId: dto.tenantId,
                appId: dto.appId,
                actorType: dto.actorType,
                actorId: dto.actorId,
                action: dto.action,
                entityType: dto.entityType,
                entityId: dto.entityId,
                metadata: dto.metadata ?? client_1.Prisma.JsonNull,
                before: dto.before ?? client_1.Prisma.JsonNull,
                after: dto.after ?? client_1.Prisma.JsonNull,
                idempotencyKey: dto.idempotencyKey,
                occurredAt: occurredAt,
                eventHash: eventHash,
                prevEventHash: prevHash,
                chainHash: chainHash,
            },
        });
        if (dto.after && dto.entityType && dto.entityId) {
            try {
                await this.versioningService.createSnapshot(dto.tenantId, dto.entityType, dto.entityId, dto.after, dto.actorId, event.id);
            }
            catch (error) {
                console.error('Failed to create snapshot:', error);
            }
        }
        return { event, status: 'CREATED' };
    }
    async findAll() {
        return this.prisma.auditEvent.findMany({
            orderBy: { occurredAt: 'desc' },
            take: 100,
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        versioning_service_1.VersioningService])
], AuditService);
//# sourceMappingURL=audit.service.js.map