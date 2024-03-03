import { BadRequestException, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { Expense } from 'src/expense/expense.schema';
import { CreateUserDTO } from './user.dto';
import { SignInDto } from 'src/auth/auth.signin.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor( 
        @InjectModel(User.name) private userModel : Model<User>,  
        @InjectModel(Expense.name) private expenseModel: Model<Expense>,
        @Inject(forwardRef(() => AuthService)) private AuthService: AuthService
        ){}
    
    async CreateUser(createUserDTO: CreateUserDTO){
        const existentUser = await this.userModel.findOne({Name: createUserDTO.Name});

        if(existentUser != null){
            throw new BadRequestException("Usuario já existe.");
        }

        const newUser = new this.userModel(createUserDTO);

        newUser.save();

        return newUser;
    }

    //password will be hashed in later versions
    async FindUser(Name, Password){
        const user = await this.userModel.findOne({Name: Name, Password: Password});
        if(user == null){
            throw new BadRequestException("Usuário não encontrado.");
        }
        return {
            Name: user.Name,
            UserId: user.id
        }
    }

    //JWT validation later :)
    async GetExpensesThisMonth(userId: string, token: string): Promise<any>{
        const User = await this.userModel.findById(userId);
        if(User == null){
            throw new BadRequestException("Usuário não encontrado.")
        }
        const payload = await this.AuthService.ValidateUser({token: token});
        if(payload.UserId != userId){
            throw new UnauthorizedException("Usuário não autorizado.")
        }


        let expensesThisMonth = 0;

        for(const expense of User.Expenses){
            const _expense = await this.expenseModel.findById(expense);
            expensesThisMonth += _expense.Value;
        }

        return expensesThisMonth;
    }
}
