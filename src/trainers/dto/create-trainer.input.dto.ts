import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateTrainerInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  secondName: string;

  @Field()
  @IsInt()
  @Min(10)
  @Max(120)
  age: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  region: string;

  @Field()
  @IsInt()
  @Min(0)
  badges: number;
}