import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Role } from './../roles/role.model';
import { UserRoles } from './../roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRoles]),
    RolesModule,
  ],
  exports: [
    UsersService,
    TypeOrmModule
  ]
})
export class UsersModule { }
