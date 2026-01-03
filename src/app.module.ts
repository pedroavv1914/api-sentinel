import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuditModule } from './audit/audit.module';
import { VersioningModule } from './versioning/versioning.module';
import { PolicyController } from './policy/policy.controller';
import { PolicyModule } from './policy/policy.module';
import { AuthModule } from './auth/auth.module';
import { TenancyModule } from './tenancy/tenancy.module';

@Module({
  imports: [PrismaModule, AuditModule, VersioningModule, PolicyModule, AuthModule, TenancyModule],
  controllers: [AppController, PolicyController],
  providers: [AppService],
})
export class AppModule {}
