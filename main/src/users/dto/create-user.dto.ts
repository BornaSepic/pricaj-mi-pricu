export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    seniority: 'junior' | 'senior';
    status: 'active' | 'inactive';
}
