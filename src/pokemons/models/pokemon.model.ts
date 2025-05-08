import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { TrainerModel } from "../../trainers/models/trainer.model";
import { TypeModel } from "./type.model";

@ObjectType()
export class PokemonModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  level: number;

  @Field(() => Int)
  attack: number;

  @Field(() => Int)
  defense: number;

  @Field(() => Int)
  speed: number;

  @Field()
  isLegendary: boolean;

  @Field(() => TrainerModel, { nullable: true })
  trainer?: TrainerModel;

  @Field(() => TypeModel)
  type: TypeModel;
}