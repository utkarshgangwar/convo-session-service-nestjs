import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { SessionsModule } from './sessions/sessions.module';
import { MongoModule } from './database/mongo.module';

@Module({
  imports: [
    MongoModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
