import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type EventDocument = Event & Document

export enum EventType {
  USER_SPEECH = 'user_speech',
  BOT_SPEECH = 'bot_speech',
  SYSTEM = 'system'
}

@Schema()
export class Event {

  @Prop({ required: true })
  eventId: string

  @Prop({ required: true })
  sessionId: string

  @Prop({ enum: EventType })
  type: EventType

  @Prop({ type: Object })
  payload: Record<string, any>

  @Prop()
  timestamp: Date
}

export const EventSchema = SchemaFactory.createForClass(Event)

EventSchema.index({ sessionId: 1, eventId: 1 }, { unique: true })