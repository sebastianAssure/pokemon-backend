import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTrainerInputDto } from './create-trainer.input.dto';
import { IsString } from 'class-validator';

@InputType()
export class UpdateTrainerInputDto extends PartialType(CreateTrainerInputDto) {
  @Field(() => ID)
  @IsString()
  id: string;
}
