import { Module } from '@nestjs/common';
import { RegistrationCodesService } from './registration-codes.service';
import { RegistrationCodesController } from './registration-codes.controller';
import { RegistrationCode } from './entities/registration-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationCode])],
  controllers: [RegistrationCodesController],
  providers: [RegistrationCodesService],
})
export class RegistrationCodesModule { }
