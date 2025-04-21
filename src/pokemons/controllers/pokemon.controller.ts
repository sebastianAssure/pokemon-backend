import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, HttpCode } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { UpdateLevelPokemonDto } from '../dto/update-level-pokemon.dto';
import { CapturePokemonDto } from '../dto/capture-pokemon.dto';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Post()
    create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    findAll(@Query('type') typeName?: string) {
        return this.pokemonService.findAll(typeName);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.pokemonService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTypeDto: UpdateLevelPokemonDto) {
        return this.pokemonService.update(id, updateTypeDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.pokemonService.remove(id);
    }

    @Patch(':id/capture')
    @HttpCode(200)
    capture(@Param('id', ParseUUIDPipe) id: string, @Body() capturePokemonDto: CapturePokemonDto) {
        return this.pokemonService.capture(id, capturePokemonDto);
    }

    @Patch(':id/release')
    @HttpCode(200)
    release(@Param('id', ParseUUIDPipe) id: string) {
        return this.pokemonService.release(id);
    }

    @Patch(':id/level-up')
    @HttpCode(200)
    levelUp(@Param('id') id: string) {
        return this.pokemonService.levelUp(id);
    }
}
