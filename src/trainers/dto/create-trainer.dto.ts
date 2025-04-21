import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsInt()
  @Min(10)
  @Max(120)
  age: number;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsInt()
  @Min(0)
  badges: number;
}

