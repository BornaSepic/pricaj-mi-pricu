import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from '../readings/entities/reading.entity';
import { Report } from './entities/report.entity';
import { ReadingsService } from '../readings/readings.service';
import { EmailsService } from '../emails/emails.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, Reading])],
  controllers: [ReportsController],
  providers: [ReportsService, ReadingsService, ConfigService, EmailsService],
})
export class ReportsModule { }
