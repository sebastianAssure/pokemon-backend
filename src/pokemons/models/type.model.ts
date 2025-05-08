import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TypeModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
