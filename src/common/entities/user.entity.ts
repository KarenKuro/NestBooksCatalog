import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @BeforeInsert()
  // if (username in us)
}
