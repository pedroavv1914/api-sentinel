import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditEventDto } from './dto/create-audit-event.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiSecurity,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';

@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('events')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api-key')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key for authentication',
    required: true,
  })
  @ApiOperation({ summary: 'Ingest a new audit event' })
  @ApiResponse({ status: 201, description: 'Event created successfully.' })
  @ApiResponse({ status: 409, description: 'Idempotency conflict.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createAuditEventDto: CreateAuditEventDto) {
    return this.auditService.create(createAuditEventDto);
  }

  @Get('events')
  @ApiOperation({ summary: 'List recent audit events' })
  async findAll() {
    return this.auditService.findAll();
  }
}
