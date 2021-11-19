import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/user.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { UserRoles } from './roles/user-roles.model';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/post.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'user_db',
      useNewUrlParser: true,
      entities: [path.join(__dirname, '**/**.model{.ts,.js}')],
      autoLoadEntities: true,
      useUnifiedTopology: true
    }),
    UsersModule,
    RolesModule,
    //AuthModule,
    //PostsModule,
    //FilesModule,
  ]
})
export class AppModule {

}