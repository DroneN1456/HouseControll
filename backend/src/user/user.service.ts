import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Expense } from 'src/expense/expense.schema';
import { CreateUserDTO } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { OwingService } from 'src/owing/owing.service';
import * as bcrypt from 'bcrypt';
import { House } from 'src/house/house.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(House.name) private houseModel: Model<House>,
    @Inject(forwardRef(() => AuthService)) private AuthService: AuthService,
    private owingService: OwingService,
    private mailService: MailService,
  ) {}

  async CreateUser(createUserDTO: CreateUserDTO) {
    const existentUser = await this.userModel.findOne({
      Email: createUserDTO.Email,
    });

    if (existentUser != null) {
      throw new BadRequestException('Usuario já existe.');
    }
    if (
      !createUserDTO.Email ||
      !createUserDTO.Name ||
      !createUserDTO.Password
    ) {
      throw new BadRequestException('All fields must have values');
    }
    //verification
    if (createUserDTO.Name.length < 3 || createUserDTO.Name.length > 40) {
      throw new BadRequestException('Name is too short or too long.');
    }
    if (
      createUserDTO.Password.length < 6 ||
      createUserDTO.Password.length > 40
    ) {
      throw new BadRequestException('Password is too short or too long.');
    }
    if (createUserDTO.Email.length < 10 || createUserDTO.Email.length > 40) {
      throw new BadRequestException('Email is too short or too long.');
    }
    const newUser = new this.userModel(createUserDTO);
    newUser.IsActivated = false;
    newUser.Password = await bcrypt.hash(
      createUserDTO.Password,
      process.env.HASH_SALT,
    );
    newUser.save();
    this.mailService.SendMail(
      'Ative sua conta',
      `Clique no link para ativar sua conta: http://${process.env.API_URL}/user/${newUser._id}/activate/`,
      newUser.Email,
    );

    return { Email: newUser.Email, Name: newUser.Name, UserId: newUser.id };
  }

  async FindUser(Email, Password) {
    const user = await this.userModel.findOne({
      Email: Email,
      Password: Password,
    });
    return !user
      ? null
      : {
          Name: user.Name,
          IsActivated: user.IsActivated,
          UserId: user._id,
        };
  }
  async GetById(UserId: string) {
    return await this.userModel.findById(UserId);
  }

  async GetProfile(token: string) {
    const payload = await this.AuthService.ValidateUser({ token: token });
    const user = await this.userModel.findById(payload.UserId);
    if (user == null) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    let expensesThisMonth = 0;
    let gainsThisMonth = 0;

    for (const expense of user.Expenses) {
      const _expense = await this.expenseModel.findById(expense);
      if (_expense.Value > 0) {
        gainsThisMonth += _expense.Value;
      } else {
        expensesThisMonth += _expense.Value;
      }
    }

    const activeOwings = await this.owingService.FindActiveOwings(
      payload.UserId,
    );
    let owing = 0;
    for (const activeOwing of activeOwings) {
      if (activeOwing.DebtorId == payload.UserId) {
        owing += activeOwing.PendingValue;
      }
    }
    const balanceForecast = expensesThisMonth + gainsThisMonth - owing;
    return {
      Name: user.Name,
      Owing: owing,
      BalanceForecast: balanceForecast,
      ExpensesThisMonth: expensesThisMonth,
    };
  }

  async GetExpensesThisMonth(userId: string, token: string): Promise<any> {
    const User = await this.userModel.findById(userId);
    if (User == null) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    const payload = await this.AuthService.ValidateUser({ token: token });
    if (payload.UserId != userId) {
      throw new UnauthorizedException('Usuário não autorizado.');
    }

    let expensesThisMonth = 0;

    for (const expense of User.Expenses) {
      const _expense = await this.expenseModel.findById(expense);
      expensesThisMonth += _expense.Value;
    }

    return expensesThisMonth;
  }
  async ActivateUser(UserId: string) {
    const user = await this.userModel.findById(UserId);
    user.IsActivated = true;
    user.save();
    return { url: `${process.env.WEB_URL}/auth/login` };
  }
  async GetKnownUsers(token: string) {
    const payload = await this.AuthService.ValidateUser({ token: token });
    const user = await this.userModel.findById(payload.UserId);
    const userHouses = await this.houseModel.find({
      Members: { $in: [user._id] },
    });
    const users = await this.userModel.find();
    const knownUsers = users.filter((user: any) => {
      return (
        userHouses.find((house: any) => {
          return house.Members.includes(user._id);
        }) != null
      );
    });
    const usersNoPassword = knownUsers.map((user: any) => {
      user.Password = '';
      return user;
    });
    return usersNoPassword;
  }
  async GetHouses(token: string) {
    const payload = await this.AuthService.ValidateUser({ token: token });
    const user = await this.userModel.findById(payload.UserId);
    const houses = await user.Houses;
    return houses;
  }
}
