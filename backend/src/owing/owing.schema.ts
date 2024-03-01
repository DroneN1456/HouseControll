import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/user.schema";

export type OwingDocument = HydratedDocument<Owing>;
@Schema()
export class Owing{
    @Prop({type: mongoose.Types.ObjectId, ref: 'User'})
    Debtor: User;
    @Prop({type: mongoose.Types.ObjectId, ref: 'User'})
    Creditor: User;
    @Prop()
    Value: number;
    @Prop()
    Status: number;
}
export const OwingSchema = SchemaFactory.createForClass(Owing);