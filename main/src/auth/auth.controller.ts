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
  async getProfile(@Request() rawReq: Request) {
    const {data: req, success} = UserJwt.safeParse(rawReq);

    if(!success) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User not found',
      };
    }

    const user = await this.authService.getUserById(req.user.sub);

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