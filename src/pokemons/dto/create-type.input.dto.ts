import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateTypeInputDto {
  @Field()
  @IsString()
  name: string;
}
