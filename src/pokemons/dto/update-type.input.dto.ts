import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTypeInputDto } from './create-type.input.dto';
import { IsString } from 'class-validator';

@InputType()
export class UpdateTypeInputDto extends PartialType(CreateTypeInputDto) {
  @Field(() => ID)
  @IsString()
  id: string;
}
