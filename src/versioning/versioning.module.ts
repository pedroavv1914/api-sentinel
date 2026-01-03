import { Module } from '@nestjs/common';
import { VersioningService } from './versioning.service';
import { VersioningController } from './versioning.controller';

@Module({
  providers: [VersioningService],
  controllers: [VersioningController]
})
export class VersioningModule {}
