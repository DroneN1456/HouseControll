import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Owing, OwingSchema } from './owing.schema';
import { OwingController } from './owing.controller';
import { OwingService } from './owing.service';
import { User, UserSchema } from 'src/user/user.schema';
import { Expense, ExpenseSchema } from 'src/expense/expense.schema';
import { ExpenseService } from 'src/expense/expense.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Owing.name, schema: OwingSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Expense.name, schema: ExpenseSchema}])
    ],
    controllers: [OwingController],
    providers: [OwingService, ExpenseService]
})
export class OwingModule {}
