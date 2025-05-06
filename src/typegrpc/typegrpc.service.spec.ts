import { Test, TestingModule } from '@nestjs/testing';
import { TypegrpcService } from './typegrpc.service';

describe('TypegrpcService', () => {
  let service: TypegrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypegrpcService],
    }).compile();

    service = module.get<TypegrpcService>(TypegrpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
