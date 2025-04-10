import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { DepartmentsService } from '../departments/departments.service';
import { UsersService } from '../users/users.service';
import { Between } from 'typeorm';
import { endOfDay, startOfDay } from 'date-fns';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService,
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService
  ) { }

  @Post()
  async create(@Body() createReadingDto: {
    userId: number,
    departmentId: number,
    date: string
  }) {

    const user = await this.usersService.findOne(createReadingDto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const department = await this.departmentsService.findOne(createReadingDto.departmentId);

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.create({
      date: new Date(createReadingDto.date),
      user,
      department,
      blocked: false
    });
  }

  @Get()
  findAll() {
    return this.readingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingsService.findOne(+id);
  }

  @Get('/department/:id/active')
  async findActiveByDepartment(@Param('id') departmentId: string) {
    const department = await this.departmentsService.findOne(+departmentId);

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.findActiveReadings(department);
  }

  @Get('/department/:id/inactive')
  async findInactiveByDepartment(@Param('id') departmentId: string) {
    const department = await this.departmentsService.findOne(+departmentId);

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.findInactiveReadings(department);
  }

  @Get('user/:id')
  findByUser(
    @Param('id') id: string,
    @Query('from') from: string,
    @Query('to') to: string
  ) {
    return this.readingsService.findAllByUser(+id, {
      from: from ? new Date(from) : null,
      to: to ? new Date(to) : null
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingsService.update(+id, updateReadingDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingsService.remove(+id);
  }
}
