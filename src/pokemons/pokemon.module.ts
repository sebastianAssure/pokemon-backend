import { Module } from '@nestjs/common';
import { TypeService } from './services/type.service';
import { TypeController } from './controllers/type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from './entities/type.entity';
import { PokemonEntity } from './entities/pokemon.entity';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { TrainersModule } from 'src/trainers/trainers.module';

@Module({
  controllers: [TypeController, PokemonController],
  providers: [TypeService, PokemonService],
  imports: [
    TypeOrmModule.forFeature([TypeEntity, PokemonEntity]),
    TrainersModule
  ],
  exports: [TypeService]
})
export class PokemonModule {}
