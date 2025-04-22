import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TrainersService } from '../services/trainers.service';
import { CreateTrainerDto } from '../dto/create-trainer.dto';
import { UpdateTrainerDto } from '../dto/update-trainer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Trainers')
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo entrenador' })
  @ApiBody({ type: CreateTrainerDto })
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los entrenadores' })
  findAll() {
    return this.trainersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un entrenador por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del entrenador' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trainersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un entrenador por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateTrainerDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainersService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un entrenador por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trainersService.remove(id);
  }

  @Get(':id/pokemons')
  @ApiOperation({ summary: 'Listar los Pokémon de un entrenador' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del entrenador' })
  getMyPokemons(@Param('id', ParseUUIDPipe) id: string) {
    return this.trainersService.getMyPokemons(id);
  }
}
