import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReadingsService } from '../readings/readings.service';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../decorators/user.decorator';
import { NullableUser } from '../users/entities/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService,
    private readonly readingsService: ReadingsService
  ) { }

  @Post()
  async create(
    @User() user: NullableUser,
    @Body() createReportDto: CreateReportDto
) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const reading = await this.readingsService.findOneByUserAndId(user.id, createReportDto.readingId);

    if (!reading) {
      throw new HttpException('Reading not found', HttpStatus.NOT_FOUND);
    }

    if (reading.report) {
      return this.reportsService.update(reading.report.id, {
        title: createReportDto.title,
        description: createReportDto.description
      })
    }

    return this.reportsService.create({
      title: createReportDto.title,
      description: createReportDto.description,
      reading: reading
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
