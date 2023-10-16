import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './client.entity';
import { RequestLog, RequestLogSchema } from './request-log.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: RequestLog.name, schema: RequestLogSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
