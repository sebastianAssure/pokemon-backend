import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTypeDto {
    
      @IsNotEmpty()
      @IsString()
      @MinLength(3)
      @MaxLength(100)
      name: string;
}