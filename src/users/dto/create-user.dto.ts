import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'spadilla', description: 'Nombre de Usuario' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    userName: string;

    @ApiProperty({ example: '1234567', description: 'Contraseña del Usuario' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
