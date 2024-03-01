import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpenseDTO } from './expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}

    @Post()
    async CreateExpense(@Body() createExpenseDTO: CreateExpenseDTO){
        return this.expenseService.CreateExpense(createExpenseDTO);
    }
}
