import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { CreateExpenseDTO } from './expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  async CreateExpense(
    @Body() createExpenseDTO: CreateExpenseDTO,
    @Headers('token') token,
  ) {
    return this.expenseService.CreateExpense(createExpenseDTO, token);
  }

  @Get()
  async GetExpenses(@Headers('token') token) {
    return this.expenseService.GetExpenses(token);
  }
  @Get('expensesAllTime')
  async GetExpensesAllTime(@Headers('token') token) {
    return this.expenseService.GetExpensesAllTime(token);
  }
  @Delete(':id')
  async DeleteById(@Param('id') id, @Headers('token') token) {
    return this.expenseService.DeleteById(id, token);
  }
}
