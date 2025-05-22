import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    code: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: 'admin' | 'user';

    @IsString()
    seniority: 'junior' | 'senior';

    @IsString()
    status: 'active' | 'inactive';
}
