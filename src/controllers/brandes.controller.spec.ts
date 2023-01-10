import { Test, TestingModule } from '@nestjs/testing';
import { BrandesController } from './brandes.controller';

describe('BrandesController', () => {
  let controller: BrandesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandesController],
    }).compile();

    controller = module.get<BrandesController>(BrandesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
