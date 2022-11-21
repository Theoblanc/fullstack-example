import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenDTO {
  @Field(() => String)
  id: string;

  @Field(() => String)
  token: string;
}
