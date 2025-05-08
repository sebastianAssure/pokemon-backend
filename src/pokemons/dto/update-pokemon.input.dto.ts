import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreatePokemonInputDto } from './create-pokemon.input.dto';
import { IsString } from 'class-validator';

@InputType()
export class UpdatePokemonInputDto extends PartialType(CreatePokemonInputDto) {
  @Field(() => ID)
  @IsString()
  id: string;
}
