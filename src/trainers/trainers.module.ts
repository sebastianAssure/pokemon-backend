import { Module } from '@nestjs/common';
import { TrainersService } from './services/trainers.service';
import { TrainersController } from './controllers/trainers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TrainerEntity
    ])
  ],
  exports: [TrainersService]
})
export class TrainersModule {}
