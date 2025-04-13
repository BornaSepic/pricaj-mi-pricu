import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { UserJwt } from './types/user-jwt';
import { User } from '../decorators/user.decorator';
import { NullableUser } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(
    @User() user: NullableUser
  ) {
    if(!user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User not found',
      };
    }

    const { password, ...result } = user;
    return result;
  }
}