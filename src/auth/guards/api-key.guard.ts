import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import * as crypto from 'crypto';
import { App } from '@prisma/client';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.headers['x-api-key'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('API Key is missing');
    }

    const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

    // Hash the provided key to match stored hash
    const hash = crypto.createHash('sha256').update(apiKey).digest('hex');

    const app = await this.prisma.app.findFirst({
      where: {
        apiKeyHash: hash,
        status: 'ACTIVE',
      },
    });

    if (!app) {
      throw new UnauthorizedException('Invalid API Key');
    }

    // Attach app to request for later use
    (request as Request & { app: App }).app = app;
    return true;
  }
}
