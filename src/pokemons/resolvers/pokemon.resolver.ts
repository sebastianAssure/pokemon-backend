import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PokemonModel } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { CreatePokemonInputDto } from '../dto/create-pokemon.input.dto';
import { UpdatePokemonInputDto } from '../dto/update-pokemon.input.dto';
import { MessageResponseModel } from '../models/message-response.model';
import { CapturePokemonInputDto } from '../dto/capture-pokemon.input.dto';

@Resolver(() => PokemonModel)
export class PokemonResolver {
    constructor(private readonly pokemonService: PokemonService) { }

    @Mutation(() => PokemonModel, { name: 'createPokemon' })
    create(@Args('createPokemonInput') createPokemonInput: CreatePokemonInputDto) {
        return this.pokemonService.create(createPokemonInput);
    }

    @Query(() => [PokemonModel], { name: 'pokemons' })
    findAll() {
        return this.pokemonService.findAll();
    }

    @Query(() => PokemonModel, { name: 'pokemon' })
    findOne(@Args('id') id: string) {
        return this.pokemonService.findOne(id);
    }

    @Mutation(() => PokemonModel, { name: 'updatePokemon' })
    update(@Args('updatePokemonInput') updatePokemonInput: UpdatePokemonInputDto) {
        return this.pokemonService.update(updatePokemonInput.id, updatePokemonInput);
    }

    @Mutation(() => MessageResponseModel, { name: 'removePokemon' })
    remove(@Args('id') id: string) {
        return this.pokemonService.remove(id);
    }

    @Mutation(() => MessageResponseModel, { name: 'releasePokemon' })
    release(@Args('id') id: string) {
        return this.pokemonService.release(id);
    }

    @Mutation(() => MessageResponseModel, { name: 'levelUpPokemon' })
    levelUp(@Args('id') id: string) {
        return this.pokemonService.levelUp(id);
    }

    @Mutation(() => PokemonModel, { name: 'capturePokemon' })
    capture(
        @Args('id') id: string,
        @Args('capturePokemonInput') capturePokemonInput: CapturePokemonInputDto
    ) {
        return this.pokemonService.capture(id, capturePokemonInput);
    }
}
