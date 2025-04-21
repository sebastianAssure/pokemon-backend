import { IsInt, IsString, Min, Max, IsBoolean, IsUUID, IsOptional } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  @Max(100)
  level: number;

  @IsUUID()
  typeId: string;

  @IsUUID()
  @IsOptional()
  trainerId?: string;

  @IsInt()
  attack: number;

  @IsInt()
  defense: number;

  @IsInt()
  speed: number;

  @IsBoolean()
  @IsOptional()
  isLegendary?: boolean = false;
}