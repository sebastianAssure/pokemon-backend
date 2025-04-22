import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'Nombre del entrenador',
    example: 'Ash',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Segundo nombre del entrenador',
    example: 'Ketchum',
  })
  @IsString()
  @IsNotEmpty()
  secondName: string;

  @ApiProperty({
    description: 'Edad del entrenador',
    minimum: 10,
    maximum: 120,
    example: 15,
  })
  @IsInt()
  @Min(10)
  @Max(120)
  age: number;

  @ApiProperty({
    description: 'Región de origen del entrenador',
    example: 'Kanto',
  })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    description: 'Cantidad de medallas que posee el entrenador',
    minimum: 0,
    example: 3,
  })
  @IsInt()
  @Min(0)
  badges: number;
}
