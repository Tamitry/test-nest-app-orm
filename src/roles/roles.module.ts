import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './role.model';
import { User } from './../users/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoles } from './user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    TypeOrmModule.forFeature([Role, User, UserRoles
    ])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule { }
