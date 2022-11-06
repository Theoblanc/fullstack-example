import { Field, ObjectType } from '@nestjs/graphql';
import { FileDTO } from 'src/file/dto/file.dto';

@ObjectType()
export class UserDTO {
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => FileDTO)
  image?: FileDTO;
}
