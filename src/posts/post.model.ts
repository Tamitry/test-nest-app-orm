import { Entity, ObjectID, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { User } from './../users/user.model';

@Entity({ name: 'posts' })
export class Post {
  @ObjectIdColumn({ unique: true })
  id: number;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column()
  image: string;

  @Column()
  userId: number;

}