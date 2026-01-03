import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditEventDto } from './dto/create-audit-event.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('events')
  @ApiOperation({ summary: 'Ingest a new audit event' })
  @ApiResponse({ status: 201, description: 'Event created successfully.' })
  @ApiResponse({ status: 409, description: 'Idempotency conflict.' })
  async create(@Body() createAuditEventDto: CreateAuditEventDto) {
    return this.auditService.create(createAuditEventDto);
  }

  @Get('events')
  @ApiOperation({ summary: 'List recent audit events' })
  async findAll() {
    return this.auditService.findAll();
  }
}
