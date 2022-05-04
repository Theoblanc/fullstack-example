import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name;
  @Field(() => String)
  email;
  @Field(() => String)
  password;
}
