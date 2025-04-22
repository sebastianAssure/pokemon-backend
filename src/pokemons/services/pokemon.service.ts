import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from '../entities/pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { handlerError } from '../../common/utils/handler-error.utils';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { TypeService } from './type.service';
import { TrainersService } from '../../trainers/services/trainers.service';
import { CapturePokemonDto } from '../dto/capture-pokemon.dto';

@Injectable()
export class PokemonService {

    private readonly logger = new Logger('PokemonService');

    constructor(
        @InjectRepository(PokemonEntity)
        private readonly pokemonRepository: Repository<PokemonEntity>,

        private readonly typeService: TypeService,
        private readonly trainerService: TrainersService,
    ) {}

    public async create(createPokemonDto: CreatePokemonDto) {
        try {
            const { typeId, ...pokemonData } = createPokemonDto;

            const type = await this.typeService.findOne(typeId);

            const pokemon = this.pokemonRepository.create({
                ...pokemonData,
                type
            });

            return await this.pokemonRepository.save(pokemon);

        } catch (error) {
            handlerError(error, this.logger);
        }
    }


    public async findAll(typeName?: string, wild?: boolean) {
        try {
            const queryBuilder = this.pokemonRepository.createQueryBuilder('pokemon')
                .leftJoinAndSelect('pokemon.type', 'type')
                .leftJoinAndSelect('pokemon.trainer', 'trainer');
    
            if (typeName) {
                queryBuilder.where('LOWER(type.name) = LOWER(:typeName)', { typeName });
            }

            if (wild) {
                queryBuilder.andWhere('pokemon.trainer IS NULL');
            }
    
            const pokemons = await queryBuilder.getMany();
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
        const { level } = updatePokemonDto;

        if (!level) throw new BadRequestException('Only level can be updated');

        const pokemon = await this.pokemonRepository.preload({
            id: id,
            level
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
        
        if (pokemon.trainer) {
            throw new BadRequestException(
                `Pokemon with id ${id} is captured by a trainer and must be released before deletion.`
            );
        }

        await this.pokemonRepository.remove(pokemon);
        return { message: `Pokemon with id ${id} has been deleted.` };
    }

    public async capture(id: string, caputurePokemonDto: CapturePokemonDto) {
        try {
            const pokemon = await this.findOne(id);

        if(pokemon.trainer) {
            throw new BadRequestException(`Pokemon with ${id} already has trainer`);
        }

        const trainer = await this.trainerService.findOne(caputurePokemonDto.trainerId);

        pokemon.trainer = trainer;

        return await this.pokemonRepository.save(pokemon);
        } catch (error) {
            handlerError(error, this.logger);
        } 
    }

    public async release(id: string) {
        try {
            const pokemon = await this.findOne(id);
    
            if (!pokemon.trainer) {
                return { message: `Pokemon with id ${id} is already wild.` };
            }
    
            pokemon.trainer = null;
            await this.pokemonRepository.save(pokemon);
    
            return { message: `Pokemon with id ${id} has been released.` };
        } catch (error) {
            handlerError(error, this.logger);
            throw error;
        }
    }

    public async levelUp(id: string) {
        try {
          const pokemon = await this.findOne(id);
      
          if (!pokemon.trainer) {
            throw new BadRequestException(`Pokemon with id ${id} is wild and cannot level up.`);
          }
      
          if (pokemon.level >= 100) {
            throw new BadRequestException(`Pokemon with id ${id} is already at max level.`);
          }
      
          pokemon.level += 1;
      
          await this.pokemonRepository.save(pokemon);
      
          return {
            message: `Pokemon with id ${id} leveled up to ${pokemon.level}.`,
            level: pokemon.level
          };
        } catch (error) {
          handlerError(error, this.logger);
          throw error;
        }
      }
      
}