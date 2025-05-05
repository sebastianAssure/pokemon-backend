import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TypeService } from '../services/type.service';
import { CreateTypeDto } from '../dto/create-type.dto';
import { UpdateTypeDto } from '../dto/update-type.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { BasicAuthGuard } from '../../auth/basic-auth/basic-auth.guard';

@ApiTags('Types')
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de Pokémon' })
  @ApiBody({ type: CreateTypeDto })
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los tipos de Pokémon' })
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de Pokémon por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID del tipo' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de Pokémon por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateTypeDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(id, updateTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de Pokémon por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeService.remove(id);
  }
}
