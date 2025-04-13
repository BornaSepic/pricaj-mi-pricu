import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { createDateFilter } from '../helpers/date/filter';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>
  ) { }

  create(createReportDto: CreateReportDto) {
    return this.reportsRepository.save(createReportDto);
  }

  findAll(findReportsDto: {
    from: Date | null;
    to: Date | null;
  }) {
    return this.reportsRepository.find(
      {
        where: {
          ...createDateFilter('created_at', findReportsDto.from, findReportsDto.to),

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
