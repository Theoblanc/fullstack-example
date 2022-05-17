import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base/base.entity';
import { TokenEntity } from 'src/token/entities/token.entity';
import { Column, Entity } from 'typeorm';

@Entity('USER')
@ObjectType()
export class UserEntity extends BaseEntity {
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
