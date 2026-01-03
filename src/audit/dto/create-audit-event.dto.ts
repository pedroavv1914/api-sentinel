import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ActorType {
  USER = 'USER',
  SERVICE = 'SERVICE',
}

export class CreateAuditEventDto {
  // In a real scenario, tenantId and appId might be extracted from the API Key or Token
  // For MVP/Testing, we might allow sending them, or we assume they are injected by a guard/interceptor.
  // I'll make them optional here assuming they are filled by the controller/service from context, 
  // or required if we want to test easily without auth first.
  // Let's make them required for the payload for now to be explicit.
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  tenantId: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  appId?: string;

  @ApiProperty({ enum: ActorType })
  @IsEnum(ActorType)
  @IsNotEmpty()
  actorType: ActorType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  actorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  entityType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  entityId: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  before?: Record<string, any>;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  after?: Record<string, any>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  idempotencyKey?: string;
}
