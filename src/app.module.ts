import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { SessionsModule } from './sessions/sessions.module';
import { MongoModule } from './database/mongo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongoModule,
    SessionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
