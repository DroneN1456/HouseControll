import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop()
  Value: number;

  @Prop()
  Title: string;

  @Prop()
  Type: string;

  @Prop()
  CreatedAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
