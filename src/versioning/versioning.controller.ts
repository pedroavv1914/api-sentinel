import { Controller, Get, Param, Post, Body, ParseIntPipe, Query } from '@nestjs/common';
import { VersioningService } from './versioning.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Versioning')
@Controller('versioning')
export class VersioningController {
  constructor(private readonly versioningService: VersioningService) {}

  @Get('history/:tenantId/:entityType/:entityId')
  @ApiOperation({ summary: 'Get version history for an entity' })
  @ApiParam({ name: 'tenantId', description: 'Tenant ID' })
  @ApiParam({ name: 'entityType', description: 'Type of the entity' })
  @ApiParam({ name: 'entityId', description: 'ID of the entity' })
  async getHistory(
    @Param('tenantId') tenantId: string,
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.versioningService.getHistory(tenantId, entityType, entityId);
  }

  @Get('snapshot/:id')
  @ApiOperation({ summary: 'Get a specific snapshot by ID' })
  async getSnapshot(@Param('id') id: string) {
    return this.versioningService.getVersion(id);
  }

  @Get('rollback-preview')
  @ApiOperation({ summary: 'Preview rollback data for a specific version' })
  @ApiQuery({ name: 'tenantId' })
  @ApiQuery({ name: 'entityType' })
  @ApiQuery({ name: 'entityId' })
  @ApiQuery({ name: 'version', type: Number })
  async getRollbackData(
    @Query('tenantId') tenantId: string,
    @Query('entityType') entityType: string,
    @Query('entityId') entityId: string,
    @Query('version', ParseIntPipe) version: number,
  ) {
    return this.versioningService.rollback(tenantId, entityType, entityId, version);
  }
}
