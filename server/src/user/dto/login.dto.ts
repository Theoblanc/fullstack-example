import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => String)
  accessToken: string;
  @Field(() => String)
  refreshToken: string;
}
