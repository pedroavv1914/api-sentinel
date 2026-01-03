import { Test, TestingModule } from '@nestjs/testing';
import { VersioningController } from './versioning.controller';

describe('VersioningController', () => {
  let controller: VersioningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersioningController],
    }).compile();

    controller = module.get<VersioningController>(VersioningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
