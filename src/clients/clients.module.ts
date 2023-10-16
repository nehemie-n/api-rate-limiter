import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
