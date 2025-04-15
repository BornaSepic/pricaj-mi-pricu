import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { DepartmentsService } from '../departments/departments.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { GetReadingByIdDto } from './dto/get-reading-by-id.dto';
import { GetReadingByDepartmentDto } from './dto/get-reading-by-department.dto';
import { FindAllByUserDto } from './dto/find-all-by-user.dto';
import { User } from '../decorators/user.decorator';
import { NullableUser } from '../users/entities/user.entity';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService,
    private readonly departmentsService: DepartmentsService
  ) { }

  @Post()
  async create(
    @User() user: NullableUser,
    @Body() createReadingDto: CreateReadingDto
) {
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

  @Get('/list')
  async findActiveByDepartment(@Query() query: GetReadingByDepartmentDto) {
    const department = await this.departmentsService.findOne(Number(query.departmentId));

    if (!department) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return query.status === 'active'
      ? this.readingsService.findActiveReadings(department)
      : this.readingsService.findInactiveReadings(department);
  }

  @Get('user')
  findByUser(
    @User() user: NullableUser,
    @Param() params: FindAllByUserDto,
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.findAllByUser(user.id, {
      from: params.from ? new Date(params.from) : null,
      to: params.to ? new Date(params.to) : null
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
