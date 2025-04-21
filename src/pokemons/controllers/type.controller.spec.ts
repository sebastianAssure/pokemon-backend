import { Test, TestingModule } from '@nestjs/testing';
import { TypeController } from './type.controller';
import { TypeService } from '../services/type.service';

describe('TypeController', () => {
  let controller: TypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeController],
      providers: [TypeService],
    }).compile();

    controller = module.get<TypeController>(TypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
