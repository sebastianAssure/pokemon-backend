import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreatePokemonInputDto {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1, { message: 'Level must be at least 1' })
  @Max(100, { message: 'Level must be at most 100' })
  level: number;

  @Field(() => Int)
  @IsInt()
  attack: number;

  @Field(() => Int)
  @IsInt()
  defense: number;

  @Field(() => Int)
  @IsInt()
  speed: number;

  @Field()
  @IsBoolean()
  isLegendary: boolean;

  @Field(() => ID)
  @IsUUID()
  typeId: string;
}
