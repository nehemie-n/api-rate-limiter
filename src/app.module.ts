import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/rate-limiter'),
    AuthModule,
    ClientsModule,
    DbModule,
    /**
     *
     * The default configuration uses an in Memory cache
     * For distributed servers we Redis to have a single source of truth since we have distributed computing nodes.
     */
    ThrottlerModule.forRoot({
      /**
       * Default config
       * (host = localhost, port = 6379)
       */
      storage: new ThrottlerStorageRedisService(),
      /**
       * When using redis clusters
       */ // storage: new ThrottlerStorageRedisService(
      //   new Redis.Cluster(nodes, options),
      // ),
      throttlers: [
        {
          ttl: seconds(parseInt(process.env.RATE_LIMIT_TTL)),
          limit: parseInt(process.env.RATE_LIMIT_MAX!),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
