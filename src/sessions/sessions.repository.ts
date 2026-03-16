import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema';
import { Event, EventDocument } from './schemas/event.schema';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel(Session.name)
    private sessionModel: Model<SessionDocument>,

    @InjectModel(Event.name)
    private eventModel: Model<EventDocument>,
  ) {}

  async upsertSession(data: Partial<Session>): Promise<Session> {
    return this.sessionModel.findOneAndUpdate(
      { sessionId: data.sessionId },
      {
        $setOnInsert: {
          ...data,
          status: 'initiated',
          startedAt: new Date(),
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
  }

  async addEvent(data: Event): Promise<Event> {
    return this.eventModel.create(data);
  }

  async findSession(sessionId: string): Promise<Session | null> {
    return this.sessionModel.findOne({ sessionId });
  }

  async findEvent(sessionId: string, eventId: string) {
    return this.eventModel.findOne({ sessionId, eventId });
  }

  async getEvents(sessionId: string, limit: number, offset: number) {
    return this.eventModel
      .find({ sessionId })
      .sort({ timestamp: 1, _id: 1 })
      .skip(offset)
      .limit(limit);
  }

  async completeSession(sessionId: string): Promise<Session | null> {
    return this.sessionModel.findOneAndUpdate(
      { sessionId },
      {
        status: 'completed',
        endedAt: new Date(),
      },
      { returnDocument: 'after' },
    );
  }
}
