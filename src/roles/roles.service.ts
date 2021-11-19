import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { ObjectID, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.save(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.findOne(id);
    return role;
  }

}
