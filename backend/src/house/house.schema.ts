import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HouseDocument = HydratedDocument<House>;
@Schema()
export class House {
  @Prop()
  Name: string;
  @Prop()
  OwnerId: string;
  @Prop([String])
  Members: string[];
}
export const HouseSchema = SchemaFactory.createForClass(House);
