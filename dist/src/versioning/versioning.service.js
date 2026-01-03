"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersioningService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const fast_json_patch_1 = require("fast-json-patch");
const client_1 = require("@prisma/client");
let VersioningService = class VersioningService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSnapshot(tenantId, entityType, entityId, newData, actorId, eventId) {
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
            diff = (0, fast_json_patch_1.compare)(latestSnapshot.data, newData);
        }
        const createData = {
            tenantId,
            entityType,
            entityId,
            version,
            data: newData,
            diff: diff ? diff : client_1.Prisma.JsonNull,
            createdBy: actorId,
            eventId,
        };
        const snapshot = await this.prisma.entitySnapshot.create({
            data: createData,
        });
        return snapshot;
    }
    async getHistory(tenantId, entityType, entityId) {
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
    async getVersion(id) {
        const snapshot = await this.prisma.entitySnapshot.findUnique({
            where: { id },
        });
        if (!snapshot) {
            throw new common_1.NotFoundException('Snapshot not found');
        }
        return snapshot;
    }
    async rollback(tenantId, entityType, entityId, targetVersion) {
        const snapshot = await this.prisma.entitySnapshot.findFirst({
            where: {
                tenantId,
                entityType,
                entityId,
                version: targetVersion,
            },
        });
        if (!snapshot) {
            throw new common_1.NotFoundException(`Version ${targetVersion} not found for this entity`);
        }
        return snapshot.data;
    }
};
exports.VersioningService = VersioningService;
exports.VersioningService = VersioningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VersioningService);
//# sourceMappingURL=versioning.service.js.map