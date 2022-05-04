import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginReturnDTO {
  @Field(() => String)
  accessToken: string;
  @Field(() => String)
  refreshToken: string;
}
