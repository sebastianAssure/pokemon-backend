import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CapturePokemonInputDto {
    @Field(() => ID)
    @IsUUID()
    trainerId: string;
}

