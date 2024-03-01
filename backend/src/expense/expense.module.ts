import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expense.schema';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Expense.name, schema: ExpenseSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    providers: [ExpenseService],
    controllers: [ExpenseController]
})
export class ExpenseModule {}
