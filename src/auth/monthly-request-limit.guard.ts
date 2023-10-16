import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ClientDocument } from '../db/client.entity';
import { RequestLogService } from './request-log/request-log.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class MonthlyRequestLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
    private readonly requestLogService: RequestLogService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const client: ClientDocument = request.user as any;
    await this.validate(client);
    await this.logRequest(client, request);
    return true;
  }

  /**
   * Checks the user monthly limit
   * @param client
   */
  private async validate(client: ClientDocument) {
    // Check request limit using Redis
    const redisClient = this.redisService.getClient();
    const currentMonth = new Date().getMonth(); // Get current month
    const requestKey = `client:${client._id}:${currentMonth}`;

    const requestCount = parseInt(await redisClient.get(requestKey)) || 0;
    if (requestCount >= client.monthlyRequestLimit) {
      throw new UnauthorizedException('Monthly limit exceeded');
    }
    // Set expiration time for the key (in seconds)
    // Assuming a month has 30 days
    const secondsInAMonth = this.remainingDays();
    await redisClient.setex(requestKey, secondsInAMonth, requestCount + 1);
  }

  /**
   * Calculates the days remaining in the month and converts in seconds
   * To use in the expiration for the redis cache
   * @returns
   */
  private remainingDays() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const remainingDaysInMonth = lastDayOfMonth - new Date().getDate();
    const secondsInADay = 24 * 60 * 60;
    const secondsInAMonth = remainingDaysInMonth * secondsInADay;
    return secondsInAMonth;
  }

  /**
   * Log request
   * @param client
   * @param req
   */
  private logRequest(client: ClientDocument, req: Request) {
    const headers = req.headersDistinct;
    delete headers['authorization'];
    this.requestLogService.logRequest(new ObjectId(client._id), req.url, {
      ip: req.ip,
      hostname: req.hostname,
      headers: headers,
      body: req.body,
    });
  }
}
