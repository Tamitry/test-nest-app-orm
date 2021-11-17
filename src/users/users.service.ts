import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from './../roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@Inject(User) private userRepository: Repository<User>,
    //private roleService: RolesService
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    // const role = await this.roleService.getRoleByValue('USER');
    // user.roles.push(role);
    this.userRepository.save(user);
    return user;
  }

  async getUsers() {
    const arr = await this.userRepository.find();
    return arr;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  // async addRole(dto: AddRoleDto) {
  //   const user = await this.userRepository.findOne(dto.userId);
  //   const role = await this.roleService.getRoleByValue(dto.value);
  //   if (role && user) {
  //     user.roles.push(role);
  //     this.userRepository.save(user);
  //     return dto;
  //   }
  //   throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  // }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findOne(dto.userId);
    user.banned = true;
    user.banReason = dto.banReason;
    await this.userRepository.save(user);
    return user;
  }
}
