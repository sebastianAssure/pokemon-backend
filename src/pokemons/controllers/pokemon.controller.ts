import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, HttpCode, UseGuards } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { UpdateLevelPokemonDto } from '../dto/update-level-pokemon.dto';
import { CapturePokemonDto } from '../dto/capture-pokemon.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { BasicAuthGuard } from '../../auth/basic-auth/basic-auth.guard';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo Pokémon' })
    @ApiBody({ type: CreatePokemonDto })
    create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @UseGuards(BasicAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Listar todos los Pokémon (con filtros opcionales)' })
    @ApiQuery({ name: 'type', required: false, description: 'Filtrar por tipo (ej: fire)' })
    @ApiQuery({ name: 'wild', required: false, type: Boolean, description: 'Filtrar solo Pokémon salvajes' })
    findAll(@Query('type') typeName?: string, @Query('wild') wild?: boolean) {
        return this.pokemonService.findAll(typeName, wild);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un Pokémon por ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'UUID del Pokémon' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.pokemonService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar el nivel de un Pokémon' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBody({ type: UpdateLevelPokemonDto })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTypeDto: UpdateLevelPokemonDto) {
        return this.pokemonService.update(id, updateTypeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un Pokémon (solo si es salvaje)' })
    @ApiParam({ name: 'id', type: 'string' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.pokemonService.remove(id);
    }

    @Patch(':id/capture')
    @ApiOperation({ summary: 'Capturar un Pokémon salvaje' })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBody({ type: CapturePokemonDto })
    @HttpCode(200)
    capture(@Param('id', ParseUUIDPipe) id: string, @Body() capturePokemonDto: CapturePokemonDto) {
        return this.pokemonService.capture(id, capturePokemonDto);
    }

    @Patch(':id/release')
    @ApiOperation({ summary: 'Liberar un Pokémon capturado' })
    @ApiParam({ name: 'id', type: 'string' })
    @HttpCode(200)
    release(@Param('id', ParseUUIDPipe) id: string) {
        return this.pokemonService.release(id);
    }

    @Patch(':id/level-up')
    @ApiOperation({ summary: 'Subir de nivel a un Pokémon (solo si tiene entrenador)' })
    @ApiParam({ name: 'id', type: 'string' })
    @HttpCode(200)
    levelUp(@Param('id') id: string) {
        return this.pokemonService.levelUp(id);
    }
}
