import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expense.schema';
import { Model } from 'mongoose';
import { CreateExpenseDTO } from './expense.dto';
import { User } from 'src/user/user.schema';
import { AuthService } from 'src/auth/auth.service';
import exp from 'constants';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private expenseModel : Model<Expense>,
        @InjectModel(User.name) private userModel : Model<User>,
        private authService: AuthService
        ) {}

    TypeTitle = {
        'market': 'Mercado',
        'payment': 'Pagamento'
    }

    async CreateExpense(createExpenseDTO: CreateExpenseDTO, token: string){
        const payload = await this.authService.ValidateUser({token});


        const newExpense = new this.expenseModel();
        newExpense.Value = createExpenseDTO.Value;
        newExpense.Type = createExpenseDTO.Type;

        if(newExpense.Type == 'misc'){
            newExpense.Title = createExpenseDTO.Title;
        }else{
            newExpense.Title = this.TypeTitle[createExpenseDTO.Type]
        }

        newExpense.save();

        const user = await this.userModel.findById(payload.UserId);

        if(user == null){
            throw new BadRequestException("Usuário não encontrado.");
        }

        user.Expenses.push(newExpense);
        user.save();
        return newExpense;
    }

    async GetExpenses(token: string){
        const payload = await this.authService.ValidateUser({token});
        const user = await this.userModel.findById(payload.UserId);

        if(user == null){
            throw new NotFoundException("Usuário não encontrado.");
        }

        const Expenses = Promise.all(user.Expenses.map(async (x) => {
            const expense = await this.expenseModel.findById(x);
            return expense;
        }))

        return Expenses;

    }

}
