import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileDTO {
  @Field()
  name: string;
  @Field()
  height: number;
  @Field()
  weight: number;
  @Field()
  url: string;
}
