import { startOfDay, endOfDay } from 'date-fns';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Repository, Between, Equal, FindOptionsWhere } from 'typeorm';
import { Department } from '../departments/entities/department.entity';
import { ActiveReadingDto } from './dto/active-reading.dto';
import { FindAllByUserDto } from './dto/find-all-by-user.dto';
import { createDateFilter } from '../helpers/date/filter';

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

  findAllByUser(userId: number, options: FindAllByUserDto): Promise<Reading[]> {
    return this.readingsRepository.find({
      where: {
        user: {
          id: userId
        },
        ...createDateFilter
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

  findInactiveReadings(department: Department): Promise<ActiveReadingDto[]> {
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
