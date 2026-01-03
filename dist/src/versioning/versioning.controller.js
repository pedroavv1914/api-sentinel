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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersioningController = void 0;
const common_1 = require("@nestjs/common");
const versioning_service_1 = require("./versioning.service");
const swagger_1 = require("@nestjs/swagger");
let VersioningController = class VersioningController {
    versioningService;
    constructor(versioningService) {
        this.versioningService = versioningService;
    }
    async getHistory(tenantId, entityType, entityId) {
        return this.versioningService.getHistory(tenantId, entityType, entityId);
    }
    async getSnapshot(id) {
        return this.versioningService.getVersion(id);
    }
    async getRollbackData(tenantId, entityType, entityId, version) {
        return this.versioningService.rollback(tenantId, entityType, entityId, version);
    }
};
exports.VersioningController = VersioningController;
__decorate([
    (0, common_1.Get)('history/:tenantId/:entityType/:entityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get version history for an entity' }),
    (0, swagger_1.ApiParam)({ name: 'tenantId', description: 'Tenant ID' }),
    (0, swagger_1.ApiParam)({ name: 'entityType', description: 'Type of the entity' }),
    (0, swagger_1.ApiParam)({ name: 'entityId', description: 'ID of the entity' }),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('entityType')),
    __param(2, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], VersioningController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)('snapshot/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific snapshot by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VersioningController.prototype, "getSnapshot", null);
__decorate([
    (0, common_1.Get)('rollback-preview'),
    (0, swagger_1.ApiOperation)({ summary: 'Preview rollback data for a specific version' }),
    (0, swagger_1.ApiQuery)({ name: 'tenantId' }),
    (0, swagger_1.ApiQuery)({ name: 'entityType' }),
    (0, swagger_1.ApiQuery)({ name: 'entityId' }),
    (0, swagger_1.ApiQuery)({ name: 'version', type: Number }),
    __param(0, (0, common_1.Query)('tenantId')),
    __param(1, (0, common_1.Query)('entityType')),
    __param(2, (0, common_1.Query)('entityId')),
    __param(3, (0, common_1.Query)('version', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Promise)
], VersioningController.prototype, "getRollbackData", null);
exports.VersioningController = VersioningController = __decorate([
    (0, swagger_1.ApiTags)('Versioning'),
    (0, common_1.Controller)('versioning'),
    __metadata("design:paramtypes", [versioning_service_1.VersioningService])
], VersioningController);
//# sourceMappingURL=versioning.controller.js.map