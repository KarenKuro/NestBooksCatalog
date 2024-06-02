import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // @BeforeInsert()
  // if (username in us)
}
