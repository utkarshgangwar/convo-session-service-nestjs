import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SessionDocument = Session & Document

export enum SessionStatus {
  INITIATED = 'initiated',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

@Schema()
export class Session {

  @Prop({ required: true, unique: true })
  sessionId: string

  @Prop({ enum: SessionStatus, default: SessionStatus.INITIATED })
  status: SessionStatus

  @Prop()
  language: string

  @Prop({ default: Date.now })
  startedAt: Date

  @Prop({ default: null })
  endedAt?: Date

  @Prop({ type: Object })
  metadata?: Record<string, any>
}

export const SessionSchema = SchemaFactory.createForClass(Session)