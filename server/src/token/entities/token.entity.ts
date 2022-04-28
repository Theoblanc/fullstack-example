import { BaseEntity } from 'src/base/base.entity';
import { TokenType } from 'src/commons/enums/token-type.enum';
import { Column } from 'typeorm';

export class TokenEntity extends BaseEntity {
  @Column()
  type: TokenType;
  @Column()
  token: string;
}
