import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { MonthlyRequestLimitGuard } from './auth/monthly-request-limit.guard';
import { ClientsService } from './clients/clients.service';
import { ClientDocument } from './db/client.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private clientsService: ClientsService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, MonthlyRequestLimitGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('upgrade')
  async upgradePlan(@Request() req) {
    let client = req.user as ClientDocument;
    client = await this.clientsService.upgradePlan(
      req.user.id,
      // this should be dynamic
      // Forexample: paid for a new plan or extra requests
      client.monthlyRequestLimit + 5,
    );
    return client;
  }
}
