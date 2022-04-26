import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ length: 500 })
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  signupVerifyToken: string;
  @Column()
  image?: string;
}
