import { Module } from '@nestjs/common';
import { TypeService } from './services/type.service';
import { TypeController } from './controllers/type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from './entities/type.entity';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [
    TypeOrmModule.forFeature([TypeEntity])
  ]
})
export class TypeModule {}
