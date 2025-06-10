import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegistrationCode } from '../registration-codes/entities/registration-code.entity';
import { RegistrationCodesService } from '../registration-codes/registration-codes.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User, RegistrationCode]), JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>('JWT_SECRET'),
      };
    },
    inject: [ConfigService],
  })],
  controllers: [UsersController],
  providers: [UsersService, RegistrationCodesService],
  exports: [UsersService]
})
export class UsersModule { }
