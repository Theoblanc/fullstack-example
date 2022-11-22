import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('POST')
@ObjectType()
export class PostEntity extends BaseEntity {
  @Column()
  content: string;

  @Column()
  likes: number;

  @Column()
  reads: number;

  @Column('simple-array')
  tags: string[];

  @OneToOne(() => UserEntity)
  @JoinColumn()
  createBy: UserEntity;
}
