import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { SessionRepository } from './sessions.repository';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/add-event.dto';
import { MongoServerError } from 'mongodb';

@Injectable()
export class SessionService {
  constructor(private sessionRepo: SessionRepository) {}

  async createSession(dto: CreateSessionDto) {
    return this.sessionRepo.upsertSession(dto);
  }

  async addEvent(sessionId: string, data: AddEventDto) {
    const session = await this.sessionRepo.findSession(sessionId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status === 'completed') {
      throw new BadRequestException('Session already completed');
    }

    try {
      return await this.sessionRepo.addEvent({
        ...data,
        sessionId,
        timestamp: new Date(),
      });
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        return this.sessionRepo.findEvent(sessionId, data.eventId);
      }

      throw error;
    }
  }

  async getSession(sessionId: string, limit = 10, pageNo = 1) {
    const session = await this.sessionRepo.findSession(sessionId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }
    
    const offset = (pageNo - 1) * limit;
    const events = await this.sessionRepo.getEvents(sessionId, limit, offset);

    return { session, events };
  }

  async completeSession(sessionId: string) {
    const session = await this.sessionRepo.findSession(sessionId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status === 'completed') {
      return session;
    }

    return this.sessionRepo.completeSession(sessionId);
  }
}
