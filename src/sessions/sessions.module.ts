import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './sessions.controller';
import { SessionService } from './sessions.service';
import { SessionRepository } from './sessions.repository';
import { Session, SessionSchema } from './schemas/session.schema';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: Event.name, schema: EventSchema }
    ])
  ],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository]
})
export class SessionsModule {}
