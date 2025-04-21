import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTrainerDto } from '../dto/create-trainer.dto';
import { UpdateTrainerDto } from '../dto/update-trainer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainerEntity } from '../entities/trainer.entity';
import { handlerError } from 'src/common/utils/handler-error.utils';

@Injectable()
export class TrainersService {

  private readonly logger = new Logger('TrainerService');

  constructor(
    @InjectRepository(TrainerEntity)
    private readonly trainerRepository: Repository<TrainerEntity>,
  ) {}

  public async create(createTrainerDto: CreateTrainerDto) {
    try {
      const trainer = this.trainerRepository.create(createTrainerDto);
      await this.trainerRepository.save(trainer);

      return trainer;

    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findAll() {
    try {
      const trainers = await this.trainerRepository.find();
      return trainers;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string) {
    try {
      const trainer = await this.trainerRepository.findOneBy({ id });
      if (!trainer) throw new NotFoundException(`Trainer with id ${id} not found.`);
      return trainer;
    } catch (error) {
      handlerError(error, this.logger);
      throw error;
    }
  }

  public async update(id: string, updateTrainerDto: UpdateTrainerDto) {
    const trainer = await this.trainerRepository.preload({
      id: id,
      ...updateTrainerDto
    });

    if (!trainer) throw new NotFoundException(`Trainer with id ${id} not found`);

    try {
      await this.trainerRepository.save(trainer);
      return trainer;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async remove(id: string) {
    const type = await this.findOne(id);
    await this.trainerRepository.remove(type);
  }
}
