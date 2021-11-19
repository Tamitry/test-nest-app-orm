import { Column, ObjectIdColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class UserRoles {
  @ObjectIdColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  userId: number
}