import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from './../roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './../roles/role.model';
import { UserRoles } from './../roles/user-roles.model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRoles) private userRolesRep: Repository<UserRoles>,
    private roleService: RolesService
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    user.roles = new Array();
    const role = await this.roleService.getRoleByValue('USER');
    this.userRolesRep.save({ userId: user.id, roleId: role.id })
    this.userRepository.save(user);
    return user.roles.push(role);
  }

  async getUsers() {
    const arr = await this.userRepository.find();
    for (let inst of arr) {
      inst.roles = new Array();
      let rolesArr = await this.userRolesRep.find({ where: { userId: inst.id } });
      console.log(rolesArr);

      for (let role of rolesArr) {
        let userRole = await this.roleService.getRoleById(role.roleId);
        console.log(userRole);

        inst.roles.push(userRole);
      }
    }
    return arr;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      this.userRolesRep.save({ userId: user.id, roleId: role.id });
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findOne(dto.userId);
    user.banned = true;
    user.banReason = dto.banReason;
    await this.userRepository.save(user);
    return user;
  }
}
