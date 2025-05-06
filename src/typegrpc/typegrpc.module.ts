import { Module } from '@nestjs/common';
import { TypegrpcController } from './typegrpc.controller';
import { PokemonModule } from 'src/pokemons/pokemon.module';

@Module({
  providers: [],
  imports: [PokemonModule],
  controllers: [TypegrpcController]
})
export class TypegrpcModule {}
