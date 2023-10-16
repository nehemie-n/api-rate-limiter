import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '../clients/clients.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { DbModule } from 'src/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { RequestLogModule } from './request-log/request-log.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    ClientsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1300s' },
    }),
    RequestLogModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
