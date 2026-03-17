import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';

import { SessionService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/add-event.dto';
import { PaginationDto } from './dto/paginationdto';

@Controller('sessions')
export class SessionController {
  constructor(private service: SessionService) {}

  @Post()
  createSession(@Body() createSessionDto: CreateSessionDto) {
    return this.service.createSession(createSessionDto);
  }

  @Post(':sessionId/events')
  addEvent(
    @Param('sessionId') sessionId: string,
    @Body() addEventDto: AddEventDto,
  ) {
    return this.service.addEvent(sessionId, addEventDto);
  }

  @Get(':sessionId')
  getSession(
    @Param('sessionId') sessionId: string,
    @Query() queryDto: PaginationDto
  ) {
    return this.service.getSession(sessionId, queryDto.limit, queryDto.pageNo);
  }

  @Post(':sessionId/complete')
  completeSession(@Param('sessionId') sessionId: string) {
    return this.service.completeSession(sessionId);
  }
}
