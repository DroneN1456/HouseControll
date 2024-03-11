import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InviteDocument = HydratedDocument<Invite>;
@Schema()
export class Invite {
  @Prop()
  HouseId: string;
  //createdAt
  //accepted
}
export const InviteSchema = SchemaFactory.createForClass(Invite);
