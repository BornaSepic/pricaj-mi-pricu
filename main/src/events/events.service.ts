import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { MoreThan, Repository } from 'typeorm';
import { SignUpForEventDto } from './dto/sign-up-for-event.dto';
import { NullableUser, User } from '../users/entities/user.entity';
import { SignOffEventDto } from './dto/sign-off-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>
  ) { }

  create(createEventDto: CreateEventDto) {
    const limit = isNaN(Number(createEventDto.limit)) ? 0 : Number(createEventDto.limit);

    return this.eventsRepository.save({
      title: createEventDto.title,
      description: createEventDto.description,
      date: createEventDto.date,
      limit: limit
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

  findAll(user: NullableUser) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isAdmin = user.role === 'admin';

    if (isAdmin) {
      return this.eventsRepository.find({
        relations: {
          users: true
        },
        order: {
          date: 'ASC'
        }
      })
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return this.eventsRepository.find({
        where: {
          date: MoreThan(yesterday)
        },
        relations: {
          users: true
        },
        order: {
          date: 'ASC'
        }
      })
    }
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
    const limit = isNaN(Number(updateEventDto.limit)) ? 0 : Number(updateEventDto.limit);

    return this.eventsRepository.update(id, {
      title: updateEventDto.title,
      description: updateEventDto.description,
      date: updateEventDto.date,
      limit: limit
    })
  }

  remove(id: number) {
    return this.eventsRepository.delete(id);
  }
}
