import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'Почтовый ящик' })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: 'Неправильный email.' })
  readonly email: string;
  @ApiProperty({ example: '1P@ss1', description: 'Пароль' })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 18, { message: 'Не меньше 4 и не больше 18' })
  readonly password: string;
}