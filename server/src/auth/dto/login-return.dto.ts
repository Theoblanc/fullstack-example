import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginDTO {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
