import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { RequestLog, RequestLogDocument } from '../../db/request-log.entity';

@Injectable()
export class RequestLogService {
  constructor(
    @InjectModel(RequestLog.name)
    private readonly requestLogModel: Model<RequestLog>,
  ) {}

  async logRequest(
    client: ObjectId,
    path: string,
    details: Record<string, any>,
  ): Promise<RequestLogDocument> {
    return this.requestLogModel
      .create({
        client,
        details,
        path,
      })
      .then((log) => log);
  }
}
