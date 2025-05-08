import { Test, TestingModule } from '@nestjs/testing';
import { TrainerResolver } from './trainer.resolver';

describe('TraineeResolver', () => {
  let resolver: TrainerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainerResolver],
    }).compile();

    resolver = module.get<TrainerResolver>(TrainerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
