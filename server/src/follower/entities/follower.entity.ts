import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('FOLLOWER')
@ObjectType()
export class FollowerEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  follower: UserEntity;
}
