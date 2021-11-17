import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from './../files/files.service';
import { Post } from './post.model';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(@Inject('POST_REPOSITORY') private postRepository: Repository<Post>,
    private fileService: FilesService) { }

  async create(dto: CreatePostDto, image: any) {
    console.log("Im in the post controller");
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
