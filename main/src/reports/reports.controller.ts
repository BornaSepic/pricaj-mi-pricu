import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReadingsService } from '../readings/readings.service';
import { CreateReportBodyDto } from './dto/create-report-body.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService,
    private readonly readingsService: ReadingsService
  ) { }

  @Post()
  async create(@Body() createReportDto: CreateReportBodyDto) {
    const reading = await this.readingsService.findOneByUserAndId(createReportDto.userId, createReportDto.readingId);

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

  @Get()
  findAll(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('userId') userId: string,
  ) {
    return this.reportsService.findAll({
      from: from ? new Date(from) : null,
      to:  to ? new Date(to) : null,
      userId: userId ? +userId : null
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
