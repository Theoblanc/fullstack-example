import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base/base.entity';
import { FileEntity } from 'src/file/entities/file.entity';
import { FollowerEntity } from 'src/follower/entities/follower.entity';
import { TokenEntity } from 'src/token/entities/token.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('USER')
@ObjectType()
export class UserEntity extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  emailVertified: boolean;

  @OneToOne(() => TokenEntity)
  @JoinColumn()
  token: TokenEntity;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  image: FileEntity;

  @OneToMany(() => FollowerEntity, (entity) => entity.follower)
  followers: FollowerEntity[];
}
