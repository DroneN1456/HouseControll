import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { Expense } from 'src/expense/expense.schema';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor( 
        @InjectModel(User.name) private userModel : Model<User>,  
        @InjectModel(Expense.name) private expenseModel: Model<Expense>
        ){}
    
    async CreateUser(createUserDTO: CreateUserDTO){
        const newUser = new this.userModel();
        newUser.Name = createUserDTO.Name;
        newUser.Password = createUserDTO.Password;
        newUser.save();
        return newUser;
    }

    //JWT validation later :)
    async GetExpensesThisMonth(userId: string): Promise<any>{
        const User = await this.userModel.findById(userId);
        const ThisMonth = new Date().getMonth() + 1;

        let expensesThisMonth = 0;

        for(const expense of User.Expenses){
            const _expense = await this.expenseModel.findById(expense);
            expensesThisMonth += _expense.Value;
        }

        return expensesThisMonth;
    }
}
