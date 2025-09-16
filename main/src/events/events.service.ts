import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { SignUpForEventDto } from './dto/sign-up-for-event.dto';
import { User } from '../users/entities/user.entity';
import { SignOffEventDto } from './dto/sign-off-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>
  ) { }

  create(createEventDto: CreateEventDto) {
    return this.eventsRepository.save({
      title: createEventDto.title,
      description: createEventDto.description,
      date: createEventDto.date
    });
  }

  async signUp(signUpForEventDto: SignUpForEventDto, user: User) {
    const event = await this.eventsRepository.findOne({
      where: { id: Number(signUpForEventDto.id) },
      relations: {
        users: true
      }
    })

    if (!event) {
      throw new HttpException('Događaj nije pronađen.', HttpStatus.NOT_ACCEPTABLE);
    }

    if (event.users.length >= event.limit) {
      throw new HttpException('Događaj je popunjen.', HttpStatus.NOT_ACCEPTABLE);
    }

    if (event.users.some((u) => u.id === user.id)) {
      throw new HttpException('Korisnik je već prijavljen na ovaj događaj.', HttpStatus.NOT_ACCEPTABLE);
    }

    event.users.push(user);
    await this.eventsRepository.save(event);
    return event;
  }

  async signOff(signoffEventDto: SignOffEventDto, user: User) {
    const event = await this.eventsRepository.findOne({
      where: { id: Number(signoffEventDto.id) },
      relations: {
        users: true
      }
    })

    if (!event) {
      throw new HttpException('Događaj nije pronađen.', HttpStatus.NOT_ACCEPTABLE);
    }

    if (!event.users.find((u) => u.id === user.id)) {
      throw new HttpException('Korisnik nije prijavljen na ovaj događaj.', HttpStatus.NOT_ACCEPTABLE);
    }

    event.users = event.users.filter((u) => u.id !== user.id);
    await this.eventsRepository.save(event);
    return event;
  }

  findAll() {
    return this.eventsRepository.find({
      relations: {
        users: true
      },
      order: {
        date: 'ASC'
      }
    })
  }

  findOne(id: number) {
    return this.eventsRepository.findOne({
      where: { id },
      relations: {
        users: true
      }
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventsRepository.update(id, {
      title: updateEventDto.title,
      description: updateEventDto.description,
      date: updateEventDto.date
    })
  }

  remove(id: number) {
    return this.eventsRepository.delete(id);
  }
}
