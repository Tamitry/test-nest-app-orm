import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Создаваемая роль." })
  readonly value: string;
  @ApiProperty({ example: "Просто Admin", description: "Её описание." })
  readonly description: string;
}