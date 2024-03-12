import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OwingDocument = HydratedDocument<Owing>;
@Schema()
export class Owing {
  @Prop()
  DebtorId: string;
  @Prop()
  CreditorId: string;
  @Prop()
  Value: number;
  @Prop()
  PendingValue: number;
  @Prop()
  Status: number;

  IsDebtor?: boolean;
}
export const OwingSchema = SchemaFactory.createForClass(Owing);
