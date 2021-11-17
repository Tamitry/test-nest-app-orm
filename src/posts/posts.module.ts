import { Module } from '@nestjs/common';
import { Post } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from './../users/user.model';
import { FilesModule } from './../files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    FilesModule
  ]
})
export class PostsModule { }
