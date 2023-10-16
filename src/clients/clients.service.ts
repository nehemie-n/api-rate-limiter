import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument, ClientModel } from '../db/client.entity';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: ClientModel) {}

  /**
   * Find client by their email
   * @param email
   * @returns
   */
  async findByEmail(email: string): Promise<ClientDocument | undefined> {
    return this.clientModel.findOne({
      email: email,
    });
  }

  /**
   * Find client by the id
   * @param id
   * @returns
   */
  async findByid(id: string): Promise<ClientDocument | undefined> {
    return this.clientModel.findById(id);
  }
}
