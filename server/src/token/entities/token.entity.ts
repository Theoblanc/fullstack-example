import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base/base.entity';
import { TokenType } from 'src/commons/enums/token-type.enum';
import { Column, Entity } from 'typeorm';

registerEnumType(TokenType, {
  name: 'TokenType',
});

@Entity('TOKEN')
@ObjectType()
export class TokenEntity extends BaseEntity {
  @Column()
  type: TokenType;
  @Column()
  token: string;
}
