import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument, ClientModel } from '../db/client.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: ClientModel) {}

  async findOne(email: string): Promise<ClientDocument | undefined> {
    return this.clientModel.findOne({
      email: email,
    });
  }
}
