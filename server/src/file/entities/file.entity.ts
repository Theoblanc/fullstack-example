import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('FILE')
@ObjectType()
export class FileEntity extends BaseEntity {
  @Column()
  name: string;
  @Column()
  height: number;
  @Column()
  weight: number;
  @Column()
  url: string;
}
