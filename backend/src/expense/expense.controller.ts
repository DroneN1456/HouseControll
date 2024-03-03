import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateExpenseDTO } from './expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}

    @Post()
    async CreateExpense(@Body() createExpenseDTO: CreateExpenseDTO, @Headers('token') token){
        return this.expenseService.CreateExpense(createExpenseDTO, token);
    }

    @Get()
    async GetExpenses(@Headers('token') token){
        return this.expenseService.GetExpenses(token);
    }
}
