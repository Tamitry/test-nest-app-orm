import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/posts/post.model";
import { Role } from './../roles/role.model';
import { Entity, ManyToMany, ObjectIdColumn, Column, OneToMany, JoinTable } from "typeorm";


@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @ObjectIdColumn()
  id: number;

  @ApiProperty({ example: 'user@mail.com', description: 'Почтовый ящик' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: '1@23Ess', description: 'Пароль пользователя' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Забанен ли пользователь' })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({ example: 'За СПАМ.', description: 'Причина блокировки пользователя.' })
  @Column({ nullable: true })
  banReason: string;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Post, post => post.userId)
  posts: Post[]
}