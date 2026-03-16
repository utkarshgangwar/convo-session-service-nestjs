import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const uri = process.env?.DB_URL || 'mongodb://localhost/';
const dbName = process.env?.DB_NAME || 'convo-session-service';
@Module({
  imports: [MongooseModule.forRoot(uri + dbName)],
})
export class MongoModule {}
