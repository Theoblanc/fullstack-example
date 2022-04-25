import { BaseEntity } from 'src/base/base.entity';

export class User extends BaseEntity {
  name;
  email;
  password;
}
