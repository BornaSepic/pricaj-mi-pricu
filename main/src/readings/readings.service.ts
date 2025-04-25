import { startOfDay, endOfDay } from 'date-fns';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Repository, Between } from 'typeorm';
import { Department } from '../departments/entities/department.entity';
import { ActiveReading, ReadingsByDate } from './types';
import { createDateFilter } from '../helpers/date/filter';
import { CreateReadingPayload } from './types';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readingsRepository: Repository<Reading>
  ) { }

  private ACTIVE_READINGS_DAYS_COUNT = 14

  async create(createReadingDto: CreateReadingPayload) {
    return this.readingsRepository.save(createReadingDto);
  }

  async findByDate(date: Date, department: Department): Promise<ActiveReading> {
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
    return this.readingsRepository.find();
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

  async findAllByUser(userId: number, options: {
    from: Date | null,
    to: Date | null
  }): Promise<ReadingsByDate[]> {
    const readingsWithinTimeframe = await this.readingsRepository.find({
      where: {
        user: {
          id: userId
        },
        date: createDateFilter(options.from, options.to)
      },
      relations: {
        user: true,
        department: true,
        report: true
      }
    });

    return Promise.all(readingsWithinTimeframe.map(reading => {
      return this.findByDate(reading.date, reading.department);
    }))
  }

  findActiveReadings(department: Department): Promise<ActiveReading[]> {
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

  findInactiveReadings(department: Department): Promise<ActiveReading[]> {
    const now = new Date();
    const days = new Array(this.ACTIVE_READINGS_DAYS_COUNT)
      .fill(0)
      .map((_, index) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (index + 1));
        return date;
      });

    return Promise.all(days.map(date => {
      return this.findByDate(date, department);
    }))
  }

  findOne(id: number) {
    return this.readingsRepository.findOne({
      where: { id },
    })
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return this.readingsRepository.update(id, updateReadingDto)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  remove(id: number) {
    return this.readingsRepository.delete(id);
  }
}
