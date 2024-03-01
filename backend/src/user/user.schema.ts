import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Expense } from "src/expense/expense.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop()
    Name: string;

    @Prop()
    Password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Expense"}]})
    Expenses: Expense[];

}

export const UserSchema = SchemaFactory.createForClass(User);