import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TrainerModel } from '../models/trainer.model';
import { TrainersService } from '../services/trainers.service';
import { CreateTrainerInputDto } from '../dto/create-trainer.input.dto';
import { UpdateTrainerInputDto } from '../dto/update-trainer.input.dto';
import { PokemonModel } from 'src/pokemons/models/pokemon.model';

@Resolver(() => TrainerModel)
export class TrainerResolver {
    constructor(private readonly trainersService: TrainersService) { }

    @Mutation(() => TrainerModel, { name: 'createTrainer' })
    create(@Args('createTrainerInput') createTrainerInputDto: CreateTrainerInputDto) {
        return this.trainersService.create(createTrainerInputDto);
    }

    @Query(() => [TrainerModel], { name: 'trainers' })
    findAll() {
        return this.trainersService.findAll();
    }

    @Query(() => TrainerModel, { name: 'trainer' })
    findOne(@Args('id') id: string) {
        return this.trainersService.findOne(id);
    }

    @Mutation(() => TrainerModel, { name: 'updateTrainer' })
    update(@Args('updateTrainerInput') updateTrainerInput: UpdateTrainerInputDto,) {
        return this.trainersService.update(updateTrainerInput.id, updateTrainerInput);
    }

    @Mutation(() => TrainerModel, { name: 'removeTrainer' })
    remove(@Args('id') id: string) {
        return this.trainersService.remove(id);
    }

    @Query(() => [PokemonModel], { name: 'getMyPokemons' })
    getMyPokemons(@Args('id') id: string) {
        return this.trainersService.getMyPokemons(id);
    }
}
