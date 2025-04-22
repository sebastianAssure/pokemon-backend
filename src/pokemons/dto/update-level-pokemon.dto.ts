import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class UpdateLevelPokemonDto {
    @ApiProperty({ example: 12, minimum: 1, maximum: 100, description: 'Nivel del Pokémon (1-100)' })
    @IsInt()
    @Min(1)
    @Max(100)
    level: number;
}