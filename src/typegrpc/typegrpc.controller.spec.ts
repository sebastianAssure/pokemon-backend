import { Test, TestingModule } from '@nestjs/testing';
import { TypegrpcController } from './typegrpc.controller';

describe('TypegrpcController', () => {
  let controller: TypegrpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypegrpcController],
    }).compile();

    controller = module.get<TypegrpcController>(TypegrpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
