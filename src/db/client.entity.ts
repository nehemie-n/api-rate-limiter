import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;
export type ClientModel = Model<ClientDocument>;

@Schema()
export class Client {
  @Prop({ unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  password: string; // hashed password
}

export const ClientSchema = SchemaFactory.createForClass(Client);
