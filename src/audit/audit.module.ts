import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { VersioningModule } from '../versioning/versioning.module';

@Module({
  imports: [VersioningModule],
  providers: [AuditService],
  controllers: [AuditController],
})
export class AuditModule {}
