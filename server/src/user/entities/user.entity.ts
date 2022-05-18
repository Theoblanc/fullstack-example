import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base/base.entity';
import { TokenEntity } from 'src/token/entities/token.entity';
import { Column, Entity } from 'typeorm';

@Entity('USER')
@ObjectType()
export class UserEntity extends BaseEntity {
  constructor(name?: string, email?: string, password?: string) {
    super();
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
  }

  @Column({ length: 500 })
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column(() => TokenEntity)
  token?: TokenEntity;
  @Column()
  image?: string;
}
