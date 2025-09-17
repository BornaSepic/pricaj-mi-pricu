import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isAuthorized = await bcrypt.compare(pass, user.password);

    if (!isAuthorized) {
      throw new UnauthorizedException();
    }

    if (user.status === 'inactive') {
      throw new UnauthorizedException('Korisnik nije aktivan.');
    }

    const { password, ...result } = user;

    const payload = {
      sub: user.id,
      ...result
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserById(id: number) {
    return this.usersService.findOne(id);
  }
}