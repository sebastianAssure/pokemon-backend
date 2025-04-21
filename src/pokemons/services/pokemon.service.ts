import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from '../entities/pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { handlerError } from 'src/common/utils/handler-error.utils';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { TypeService } from './type.service';
import { TrainersService } from 'src/trainers/services/trainers.service';
import { TrainerEntity } from 'src/trainers/entities/trainer.entity';

@Injectable()
export class PokemonService {

    private readonly logger = new Logger('PokemonService');

    constructor(
        @InjectRepository(PokemonEntity)
        private readonly pokemonRepository: Repository<PokemonEntity>,

        private readonly typeService: TypeService,
        private readonly trainerService: TrainersService,
    ) { }

    public async create(createPokemonDto: CreatePokemonDto) {
        try {
            const { typeId, trainerId, ...pokemonData } = createPokemonDto;

            const type = await this.typeService.findOne(typeId);

            let trainer: TrainerEntity | undefined;
            if (trainerId) {
                trainer = await this.trainerService.findOne(trainerId);
            }

            const pokemon = this.pokemonRepository.create({
                ...pokemonData,
                type,
                ...(trainer && { trainer }),
            });

            return await this.pokemonRepository.save(pokemon);

        } catch (error) {
            handlerError(error, this.logger);
        }
    }


    public async findAll() {
        try {
            const pokemons = await this.pokemonRepository.find();
            return pokemons;
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async findOne(id: string) {
        try {
            const pokemon = await this.pokemonRepository.findOneBy({ id });
            if (!pokemon) throw new NotFoundException(`Pokemon with id ${id} not found.`);
            return pokemon;
        } catch (error) {
            handlerError(error, this.logger);
            throw error;
        }
    }

    public async update(id: string, updatePokemonDto: UpdatePokemonDto) {
        const pokemon = await this.pokemonRepository.preload({
            id: id,
            ...updatePokemonDto
        });

        if (!pokemon) throw new NotFoundException(`Pokemon with id ${id} not found`);

        try {
            await this.pokemonRepository.save(pokemon);
            return pokemon;
        } catch (error) {
            handlerError(error, this.logger);
        }
    }

    public async remove(id: string) {
        const pokemon = await this.findOne(id);
        await this.pokemonRepository.remove(pokemon);
    }
}