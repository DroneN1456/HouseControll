import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Owing, OwingSchema } from './owing.schema';
import { OwingController } from './owing.controller';
import { OwingService } from './owing.service';
import { User, UserSchema } from 'src/user/user.schema';
import { Expense, ExpenseSchema } from 'src/expense/expense.schema';
import { ExpenseService } from 'src/expense/expense.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Owing.name, schema: OwingSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Expense.name, schema: ExpenseSchema}]),
        AuthModule
    ],
    controllers: [OwingController],
    providers: [OwingService, ExpenseService]
})
export class OwingModule {}
