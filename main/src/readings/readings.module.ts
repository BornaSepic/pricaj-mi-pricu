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

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading, Department, Report])],
  controllers: [ReadingsController],
  providers: [ReadingsService, DepartmentsService, ConfigService, EmailsService],
})
export class ReadingsModule { }
