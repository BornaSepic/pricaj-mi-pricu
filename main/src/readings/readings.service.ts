import { startOfDay, endOfDay } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Repository, Between, Equal } from 'typeorm';
import { Department } from '../departments/entities/department.entity';
import { ActiveReadingDto } from './dto/active-reading.dto';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readingsRepository: Repository<Reading>
  ) { }

  private ACTIVE_READINGS_DAYS_COUNT = 14

  async create(createReadingDto: CreateReadingDto) {
    return this.readingsRepository.save(createReadingDto);
  }

  async findByDate(date: Date, department: Department): Promise<ActiveReadingDto> {
    const readingsOnDate = await this.readingsRepository.find({
      where: {
        date: Between(new Date(startOfDay(date)), new Date(endOfDay(date))),
        department: {
          id: department.id
        }
      },
      relations: {
        user: true,
        department: true
      }
    })

    return ({
      date: startOfDay(date),
      readings: readingsOnDate
    });
  }

  findAll() {
    return `This action returns all readings`;
  }

  findOneByUserAndId(userId: number, id: number): Promise<Reading | null> {
    return this.readingsRepository.findOne({
      where: {
        id: id,
        user: {
          id: userId
        }
      },
      relations: {
        user: true,
        department: true,
        report: true
      }
    });
  }

  findAllByUser(userId: number): Promise<Reading[]> {
    return this.readingsRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: {
        user: true,
        department: true,
        report: true
      }
    });
  }

  findActiveReadings(department: Department): Promise<ActiveReadingDto[]> {
    const now = new Date();
    const days = new Array(this.ACTIVE_READINGS_DAYS_COUNT)
      .fill(0)
      .map((_, index) => {
        const date = new Date(now);
        date.setDate(date.getDate() + index);
        return date;
      });

    return Promise.all(days.map(date => {
      return this.findByDate(date, department);
    }))
  }

  findOne(id: number) {
    return `This action returns a #${id} reading`;
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return `This action updates a #${id} reading`;
  }

  remove(id: number) {
    return `This action removes a #${id} reading`;
  }
}
