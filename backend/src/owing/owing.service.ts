import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwingDTO } from './owing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Owing } from './owing.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Expense } from 'src/expense/expense.schema';
import { ExpenseService } from 'src/expense/expense.service';
import { CreateExpenseDTO } from 'src/expense/expense.dto';
import { PayOwingDTO } from './payOwing.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OwingService {
    constructor(
        @InjectModel(Owing.name) private owingModel : Model<Owing>,
        @InjectModel(User.name) private userModel : Model<User>,
        @InjectModel(Expense.name) private expenseModel : Model<Expense>,
        private expenseService: ExpenseService,
        private authService: AuthService
        ) {}

    async CreateOwing(createOwingDTO: CreateOwingDTO, token: string){
        const payload = await this.authService.ValidateUser({token});

        if(payload.UserId != createOwingDTO.Debtor){
            throw new BadRequestException("Usuário não autorizado.");
        }

        const newOwing = new this.owingModel();
        const Debtor = await this.userModel.findById(createOwingDTO.Debtor);
        const Creditor = await this.userModel.findById(createOwingDTO.Creditor);
        if(Debtor == null || Creditor == null){
            throw new NotFoundException("Debtor não encontrado.");
        }
        newOwing.Debtor = Debtor;
        newOwing.Creditor = Creditor;
        newOwing.Value = createOwingDTO.Value;
        newOwing.Status = 0;

        newOwing.save();
        return newOwing;
    }

    async PayOwing(payOwingDTO: PayOwingDTO, token: string){

        const owing = await this.owingModel.findById(payOwingDTO.OwingId);
        if(owing == null){
            throw new NotFoundException("Deveção não encontrada.")
        }
        
        if(owing.Status != 0){
            throw new BadRequestException("Deveção ja foi paga.")
        }

        const Debtor = await this.userModel.findById(owing.Debtor);
        const Creditor = await this.userModel.findById(owing.Creditor);

        if(Debtor == null || Creditor == null){
            throw new BadRequestException();
        }
        
        this.expenseService.CreateExpense(new CreateExpenseDTO(-owing.Value, 'payment'), token)
        this.expenseService.CreateExpense(new CreateExpenseDTO(owing.Value, 'payment'), token)

        owing.Value -= payOwingDTO.Value;

        if(owing.Value <= 0){
            owing.Status = 1;
        }

        owing.save();

        return owing;
        
    }
}
