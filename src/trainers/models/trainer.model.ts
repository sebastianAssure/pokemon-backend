import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TrainerModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  secondName: string;

  @Field(() => Int)
  age: number;

  @Field()
  region: string;

  @Field(() => Int)
  badges: number;
}
