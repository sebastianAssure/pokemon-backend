import { Module } from '@nestjs/common';
import { TypeService } from './services/type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from './entities/type.entity';
import { PokemonEntity } from './entities/pokemon.entity';
import { PokemonService } from './services/pokemon.service';
import { TrainersModule } from '../trainers/trainers.module';
import { TypeResolver } from './resolvers/type.resolver';
import { PokemonResolver } from './resolvers/pokemon.resolver';
import { TrainerResolver } from 'src/trainers/resolvers/trainer.resolver';

@Module({
  controllers: [],
  providers: [TypeService, PokemonService, TypeResolver, PokemonResolver, TrainerResolver],
  imports: [
    TypeOrmModule.forFeature([TypeEntity, PokemonEntity]),
    TrainersModule
  ]
})
export class PokemonModule {}
