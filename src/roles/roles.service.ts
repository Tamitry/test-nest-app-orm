import { Inject, Injectable } from '@nestjs/common';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(@Inject(Role) private roleRepository: Repository<Role>) { }

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }

}
