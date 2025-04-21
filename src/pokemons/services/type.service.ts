import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from '../dto/create-type.dto';
import { UpdateTypeDto } from '../dto/update-type.dto';
import { TypeEntity } from '../entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handlerError } from 'src/common/utils/handler-error.utils';

@Injectable()
export class TypeService {

  private readonly logger = new Logger('TypeService');

  constructor(
    @InjectRepository(TypeEntity)
    private readonly typeRepository: Repository<TypeEntity>,
  ) {}

  public async create(createTypeDto: CreateTypeDto) {
    try {
      const type = this.typeRepository.create(createTypeDto);
      await this.typeRepository.save(type);

      return type;

    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findAll() {
    try {
      const types = await this.typeRepository.find();
      return types;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async findOne(id: string) {
    try {
      const type= await this.typeRepository.findOneBy({ id });
      if (!type) throw new NotFoundException(`Type with id ${ id } not found.`);
      return type;
    } catch (error) {
      handlerError(error, this.logger);
      throw error; 
    }
  }

  public async update(id: string, updateTypeDto: UpdateTypeDto) {
    const type = await this.typeRepository.preload({
      id: id,
      ...updateTypeDto
    });

    if ( !type ) throw new NotFoundException(`Type with id ${id} not found`);

    try {
      await this.typeRepository.save(type);
      return type;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async remove(id: string) {
    const type = await this.findOne(id);
    await this.typeRepository.remove(type);
  }
}
