import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from './../pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  public create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  public getAll() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Post('/role')
  public addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Post('/ban')
  public banUser(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
