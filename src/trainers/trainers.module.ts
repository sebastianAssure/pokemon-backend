import { Module } from '@nestjs/common';
import { TrainersService } from './services/trainers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';
import { TrainerResolver } from './resolvers/trainer.resolver';

@Module({
  controllers: [],
  providers: [TrainersService, TrainerResolver],
  imports: [
    TypeOrmModule.forFeature([
      TrainerEntity
    ])
  ],
  exports: [TrainersService]
})
export class TrainersModule {}
