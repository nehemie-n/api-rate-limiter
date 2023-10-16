import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
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
    return this.clientModel
      .findOne({
        email: email,
      })
      .select({
        _id: 1,
        id: 1,
        email: 1,
        password: 1,
        monthlyRequestLimit: 1,
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

  /**
   * Find client by the id and upgrade their plan
   * @param id
   * @returns
   */
  async upgradePlan(id: ObjectId, plan: number): Promise<ClientDocument> {
    return this.clientModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: { monthlyRequestLimit: plan },
        },
        {
          new: true,
        },
      )
      .then((resp) => resp);
  }
}
