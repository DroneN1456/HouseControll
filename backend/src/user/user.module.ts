import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Expense, ExpenseSchema } from 'src/expense/expense.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Expense.name, schema: ExpenseSchema}])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {
    
}
