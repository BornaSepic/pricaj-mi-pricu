import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UsersService } from '../users/users.service';
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
      throw new Error('Reading not found');
    }

    if(reading.report) {
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
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
