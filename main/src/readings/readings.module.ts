import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Department } from '../departments/entities/department.entity';
import { DepartmentsService } from '../departments/departments.service';
import { Report } from '../reports/entities/report.entity';
import { ConfigService } from '@nestjs/config';
import { EmailsService } from '../emails/emails.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading, Department, Report]),
    UsersModule
  ],
  controllers: [ReadingsController],
  providers: [ReadingsService, UsersService, DepartmentsService, ConfigService, EmailsService, JwtService],
})
export class ReadingsModule { }
