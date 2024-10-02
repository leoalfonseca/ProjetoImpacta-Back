import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event } from './entities/event.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('event')
  @UsePipes(new ValidationPipe({ transform: true }))
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.calendarService.create(createEventDto);
  }

  @Get('events')
  findAllEvents(): Promise<Event[]> {
    return this.calendarService.findAll();
  }

  @Get('event/:id')
  findEventById(@Param('id') id: string): Promise<Event> {
    return this.calendarService.findOne(id);
  }

  @Patch('event/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.calendarService.update(id, updateEventDto);
  }

  @Delete('event/:id')
  removeEvent(@Param('id') id: string): Promise<void> {
    return this.calendarService.remove(id);
  }
}
