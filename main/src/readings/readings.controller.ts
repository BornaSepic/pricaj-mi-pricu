import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { DepartmentsService } from '../departments/departments.service';
import { UsersService } from '../users/users.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { GetReadingByIdDto } from './dto/get-reading-by-id.dto';
import { GetReadingByDepartmentDto } from './dto/get-reading-by-department.dto';
import { FindAllByUserDto, FindAllByUserQueryDto } from './dto/find-all-by-user.dto';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService,
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService
  ) { }

  @Post()
  async create(@Body() createReadingDto: CreateReadingDto) {
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
  findOne(@Param() params: GetReadingByIdDto) {
    return this.readingsService.findOne(Number(params.id));
  }

  @Get('/department/:id/active')
  async findActiveByDepartment(@Param() params: GetReadingByDepartmentDto) {
    const department = await this.departmentsService.findOne(Number(params.id));

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.findActiveReadings(department);
  }

  @Get('/department/:id/inactive')
  async findInactiveByDepartment(@Param() params: GetReadingByDepartmentDto) {
    const department = await this.departmentsService.findOne(Number(params.id));

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.findInactiveReadings(department);
  }

  @Get('user/:id')
  findByUser(
    @Param() params: FindAllByUserDto,
    @Query() query: FindAllByUserQueryDto,
  ) {
    return this.readingsService.findAllByUser(+params.id, {
      from: query.from ? new Date(query.from) : null,
      to: query.to ? new Date(query.to) : null
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
