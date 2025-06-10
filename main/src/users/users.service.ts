import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegistrationCodesService } from '../registration-codes/registration-codes.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly registrationCodeService: RegistrationCodesService,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const isCodeValid = await this.registrationCodeService.validateCode(createUserDto.code);

    if (!isCodeValid) {
      throw new HttpException('Invalid registration code', HttpStatus.UNAUTHORIZED);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    })

    const { password, ...result } = user;
    const payload = {
      sub: user.id,
      ...result
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id
      }
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        seniority: true,
        status: true,
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
