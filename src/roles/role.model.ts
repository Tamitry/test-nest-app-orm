import { ApiProperty } from "@nestjs/swagger";
import { User } from './../users/user.model';
import { Entity, ManyToMany, ObjectIdColumn, Column, OneToMany, JoinTable } from "typeorm";
import { UserRoles } from './user-roles.model';


@Entity({ name: 'roles' })
export class Role {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @ObjectIdColumn()
  id: number;

  @ApiProperty({ example: 'Пользователь', description: 'Имя роли' })
  @Column({ nullable: false, unique: true })
  value: string;

  @ApiProperty({ example: 'Зарегистрированный актер', description: 'Актер прошедший аутентификацию.' })
  @Column({ nullable: true })
  description: string;


  // @ManyToMany(() => User, user => user.roles)
  // users: User[]
}