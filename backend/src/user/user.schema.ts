import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Expense } from 'src/expense/expense.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  Email: string;

  @Prop()
  Name: string;

  @Prop()
  Password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }] })
  Expenses: Expense[];

  @Prop([String])
  Houses: string[];

  @Prop()
  IsActivated: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
