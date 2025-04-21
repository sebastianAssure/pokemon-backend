import { Module } from '@nestjs/common';
import { TrainersService } from './services/trainers.service';
import { TrainersController } from './controllers/trainers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService],
  imports: [
    TypeOrmModule.forFeature([
      TrainerEntity
    ])
  ],
  exports: [TrainersService]
})
export class TrainersModule {}
