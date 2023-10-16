import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/db/db.module';
import { RequestLogService } from './request-log.service';

@Module({
  imports: [ConfigModule.forRoot(), DbModule],
  providers: [RequestLogService],
  exports: [RequestLogService],
})
export class RequestLogModule {}
