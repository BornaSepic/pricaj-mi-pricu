import { Injectable } from '@nestjs/common';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { createDateFilter } from '../helpers/date/filter';
import { Reading } from '../readings/entities/reading.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>
  ) { }

  create(createReportDto: {
    title: string;
    description: string;
    reading: Reading;
  }) {
    return this.reportsRepository.save(createReportDto);
  }

  findAll(findReportsDto: {
    from: Date | null;
    to: Date | null;
  }) {
    return this.reportsRepository.find(
      {
        where: {
          created_at: createDateFilter(findReportsDto.from, findReportsDto.to)
        }
      }
    );
  }

  findOne(id: number) {
    return this.reportsRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportsRepository.update(id, updateReportDto)
  }

  remove(id: number) {
    return this.reportsRepository.delete(id);
  }
}
