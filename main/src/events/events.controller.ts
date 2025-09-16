import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../decorators/user.decorator';
import { NullableUser } from '../users/entities/user.entity';
import { SignOffEventDto } from './dto/sign-off-event.dto';
import { SignUpForEventDto } from './dto/sign-up-for-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post('/signUp')
  signUp(
    @User() user: NullableUser,
    @Query() signupEventDto: SignUpForEventDto
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return this.eventsService.signUp(signupEventDto, user);
  }

  @Post('/signOff')
  signOff(
    @User() user: NullableUser,
    @Query() signoffEventDto: SignOffEventDto
  ) {
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return this.eventsService.signOff(signoffEventDto, user);
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(
    @User() user: NullableUser,
  ) {
    return this.eventsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
