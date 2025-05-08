import { IsInt, IsString, Min, Max, IsBoolean, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePokemonDto {
  @ApiProperty({ example: 'Charmander', description: 'Nombre del Pokémon' })
  @IsString()
  name: string;

  @ApiProperty({ example: 12, minimum: 1, maximum: 100, description: 'Nivel del Pokémon (1-100)' })
  @IsInt()
  @Min(1, { message: 'Level must be at least 1' })
  @Max(10, { message: 'Level must be at most 100' })
  level: number;

  @ApiProperty({ example: 'c3a9b87f-1122-4db0-a7b1-e2f234fa7909', description: 'UUID del tipo de Pokémon' })
  @IsUUID()
  typeId: string;

  @ApiProperty({ example: 55, description: 'Valor de ataque del Pokémon' })
  @IsInt()
  attack: number;

  @ApiProperty({ example: 40, description: 'Valor de defensa del Pokémon' })
  @IsInt()
  defense: number;

  @ApiProperty({ example: 70, description: 'Velocidad del Pokémon' })
  @IsInt()
  speed: number;

  @ApiPropertyOptional({ example: false, description: '¿Es legendario? (opcional)' })
  @IsBoolean()
  @IsOptional()
  isLegendary?: boolean = false;
}
