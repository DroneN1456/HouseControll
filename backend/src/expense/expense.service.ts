import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expense.schema';
import { Model } from 'mongoose';
import { CreateExpenseDTO } from './expense.dto';
import { User } from 'src/user/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  TypeTitle = {
    market: 'Mercado',
    payment: 'Pagamento',
    owing: 'Dívida',
  };

  async CreateExpense(createExpenseDTO: CreateExpenseDTO, token: string) {
    const payload = await this.authService.ValidateUser({ token });

    const newExpense = new this.expenseModel();
    newExpense.Value = createExpenseDTO.Value;
    newExpense.Type = createExpenseDTO.Type;

    if (newExpense.Title) {
      newExpense.Title = createExpenseDTO.Title;
    } else {
      newExpense.Title = this.TypeTitle[createExpenseDTO.Type];
    }

    newExpense.save();

    const user = await this.userModel.findById(payload.UserId);

    if (user == null) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    user.Expenses.push(newExpense);
    user.save();
    return newExpense;
  }
  async CreateExpenseById(createExpenseDTO: CreateExpenseDTO, UserId: string) {
    const newExpense = new this.expenseModel();
    newExpense.Value = createExpenseDTO.Value;
    newExpense.Type = createExpenseDTO.Type;

    if (newExpense.Title) {
      newExpense.Title = createExpenseDTO.Title;
    } else {
      newExpense.Title = this.TypeTitle[createExpenseDTO.Type];
    }

    newExpense.save();

    const user = await this.userModel.findById(UserId);

    if (user == null) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    user.Expenses.push(newExpense);
    user.save();
    return newExpense;
  }

  async GetExpenses(token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const user = await this.userModel.findById(payload.UserId);

    if (user == null) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const Expenses = Promise.all(
      user.Expenses.map(async (x) => {
        const expense = await this.expenseModel.findById(x);
        return expense;
      }),
    );

    return Expenses;
  }
  async GetExpensesAllTime(token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const user = await this.userModel.findById(payload.UserId);

    if (user == null) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const Expenses = await Promise.all(
      user.Expenses.map(async (x) => {
        const expense = await this.expenseModel.findById(x);
        return expense;
      }),
    );

    let ExpensesAllTime = 0;
    for (const expense of Expenses) {
      ExpensesAllTime += expense.Value;
    }
    return {
      ExpensesAllTime,
    };
  }
  async DeleteById(expenseId: string, token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const user = await this.userModel.findById(payload.UserId);

    if (user == null) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const deletedExpense = await this.expenseModel.deleteOne({
      _id: expenseId,
    });

    user.Expenses = user.Expenses.filter((x: any) => x != expenseId);
    user.save();

    return deletedExpense;
  }
}
