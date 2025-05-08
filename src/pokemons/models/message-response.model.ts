// common/dto/message-response.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponseModel {
  @Field()
  message: string;
}
