import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>
  ) { }

  create(createReportDto: CreateReportDto) {
    return this.reportsRepository.save(createReportDto);
  }

  findAll() {
    return this.reportsRepository.find();
  }

  findOne(id: number) {
    return this.reportsRepository.findOne({
      where: { id }
    });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportsRepository.update(id, updateReportDto);
  }

  remove(id: number) {
    return this.reportsRepository.delete(id);
  }
}
