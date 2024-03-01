import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expense.schema';
import { Model } from 'mongoose';
import { CreateExpenseDTO } from './expense.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private expenseModel : Model<Expense>,
        @InjectModel(User.name) private userModel : Model<User>
        ) {}

    TypeTitle = {
        'market': 'Mercado',
        'payment': 'Pagamento'
    }

    async CreateExpense(createExpenseDTO: CreateExpenseDTO){
        const newExpense = new this.expenseModel();
        newExpense.Value = createExpenseDTO.Value;
        newExpense.Type = createExpenseDTO.Type;

        if(newExpense.Type == 'misc'){
            newExpense.Title = createExpenseDTO.Title;
        }else{
            newExpense.Title = this.TypeTitle[createExpenseDTO.Type]
        }

        newExpense.save();

        const user = await this.userModel.findById(createExpenseDTO.UserId);
        if(user == null){
            throw new NotFoundException("Usuario não encontrado.");
        }
        user.Expenses.push(newExpense);
        user.save();
        return newExpense;
    }

}
