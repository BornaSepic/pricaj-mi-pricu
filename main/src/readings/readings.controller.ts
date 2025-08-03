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
import { CreateReadingsReportDto } from './dto/create-readings-report.dto';
import { BlockReadingDto } from './dto/block-reading.dto';
import { UsersService } from '../users/users.service';

@Controller('readings')
export class ReadingsController {
  constructor(
    private readonly readingsService: ReadingsService,
    private readonly departmentsService: DepartmentsService,
    private readonly usersService: UsersService
  ) { }

  @Post('/block')
  async blockReading(
    @User() user: NullableUser,
    @Body() blockReadingDTO: BlockReadingDto
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const allDepartments = await this.departmentsService.findAll();

    return this.readingsService.block({
      departments: allDepartments,
      date: new Date(blockReadingDTO.date)
    });
  }

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

    let userToAssign: NullableUser = null;

    if (createReadingDto.userId && createReadingDto.userId !== user.id) {
      userToAssign = await this.usersService.findOne(createReadingDto.userId);
    }

    const finalUser = userToAssign || user;

    return this.readingsService.create({
      date: new Date(createReadingDto.date),
      user: finalUser,
      department,
      blocked: false
    });
  }

  @Get()
  findAll() {
    return this.readingsService.findAll();
  }

  @Get('list')
  async findByDepartment(@Query() query: GetReadingByDepartmentDto) {
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
    @Query() query: FindAllByUserDto,
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.readingsService.findAllByUser(user.id, {
      from: query.from ? new Date(query.from) : null,
      to: query.to ? new Date(query.to) : null
    });
  }

  @Post('create-report')
  createReadingsReportForFilters(
    @User() user: NullableUser,
    @Body() createReadingsReportDto: CreateReadingsReportDto
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const {
      from,
      to,
      departmentId
    } = createReadingsReportDto

    return this.readingsService.createReadingReportForFilters(
      user,
      {
        from: from ? new Date(from) : null,
        to: to ? new Date(to) : null,
        departmentId: departmentId
      }
    )
  }

  @Get(':id')
  findOne(@Param() params: GetReadingByIdDto) {
    return this.readingsService.findOne(Number(params.id));
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
