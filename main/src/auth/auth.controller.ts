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
import { User } from '../decorators/user.decorator';
import { NullableUser } from '../users/entities/user.entity';
import { LogInDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: LogInDto) {
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