import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Model,
  Schema as MongooseSchema,
} from 'mongoose';

export type RequestLogDocument = HydratedDocument<RequestLog>;
export type RequestLogModel = Model<RequestLogDocument>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class RequestLog extends Document {
  @Prop({ type: String, required: true })
  client: string; // reference to the client

  @Prop({ type: MongooseSchema.Types.Map })
  details: Record<string, any>;

  @Prop({ required: true })
  path: string;
}

export const RequestLogSchema = SchemaFactory.createForClass(RequestLog);
