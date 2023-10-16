import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Document } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;
export type ClientModel = Model<ClientDocument>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Client extends Document {
  @Prop({ unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  password: string; // hashed password

  /**
   * This field can be as complicated as an embedded subscription plan
   */
  @Prop({ default: 0 })
  monthlyRequestLimit: number; // tracks subscription request limits per month
}

export const ClientSchema = SchemaFactory.createForClass(Client);
