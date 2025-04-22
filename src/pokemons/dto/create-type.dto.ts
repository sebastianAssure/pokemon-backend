import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTypeDto {
    
      @ApiProperty({ example: 'Roca', description: 'Tipo del Pokémon' })
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @MaxLength(100)
      name: string;
}