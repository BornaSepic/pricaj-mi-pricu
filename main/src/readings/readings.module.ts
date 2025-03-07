import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Department } from '../departments/entities/department.entity';
import { User } from '../users/entities/user.entity';
import { DepartmentsService } from '../departments/departments.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading, Department, User])],
  controllers: [ReadingsController],
  providers: [ReadingsService, DepartmentsService, UsersService],
})
export class ReadingsModule { }
