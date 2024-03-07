import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwingDTO } from './owing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Owing } from './owing.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { ExpenseService } from 'src/expense/expense.service';
import { CreateExpenseDTO } from 'src/expense/expense.dto';
import { PayOwingDTO } from './payOwing.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OwingService {
  constructor(
    @InjectModel(Owing.name) private owingModel: Model<Owing>,
    @InjectModel(User.name) private userModel: Model<User>,
    private expenseService: ExpenseService,
    private authService: AuthService,
  ) {}

  async CreateOwing(createOwingDTO: CreateOwingDTO, token: string) {
    const payload = await this.authService.ValidateUser({ token });

    const newOwing = new this.owingModel();
    const Debtor = await this.userModel.findById(payload.UserId);
    const Creditor = await this.userModel.findById(createOwingDTO.Creditor);
    if (Debtor == null || Creditor == null) {
      throw new NotFoundException('Debtor não encontrado.');
    }
    newOwing.Debtor = Debtor;
    newOwing.Creditor = Creditor;
    newOwing.Value = createOwingDTO.Value;
    newOwing.Status = 0;

    newOwing.save();
    return newOwing;
  }

  async PayOwing(payOwingDTO: PayOwingDTO, token: string) {
    const owing = await this.owingModel.findById(payOwingDTO.OwingId);
    if (owing == null) {
      throw new NotFoundException('Deveção não encontrada.');
    }

    if (owing.Status != 0) {
      throw new BadRequestException('Deveção ja foi paga.');
    }

    const Debtor = await this.userModel.findById(owing.Debtor);
    const Creditor = await this.userModel.findById(owing.Creditor);

    if (Debtor == null || Creditor == null) {
      throw new BadRequestException();
    }

    this.expenseService.CreateExpense(
      new CreateExpenseDTO(-payOwingDTO.Value, 'payment'),
      token,
    );
    this.expenseService.CreateExpenseById(
      new CreateExpenseDTO(payOwingDTO.Value, 'payment'),
      Creditor.id,
    );

    owing.Value -= payOwingDTO.Value;
    owing.Value = Math.round(owing.Value * 100) / 100;

    if (owing.Value <= 0.01) {
      owing.Value = 0;
      owing.Status = 1;
    }

    owing.save();

    return owing;
  }
  async FindActiveOwings(DebtorId: string) {
    const owings = await this.owingModel.find({
      Debtor: new mongoose.Types.ObjectId(DebtorId),
      Status: 0,
    });
    return owings;
  }
  async GetOwings(token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const owings = await this.owingModel.find({
      Debtor: new mongoose.Types.ObjectId(payload.UserId),
    });
    await Promise.all(
      owings.map(async (owing: any) => {
        const debtor = await this.userModel.findById(owing.Debtor);
        const creditor = await this.userModel.findById(owing.Creditor);
        owing.Debtor = debtor.Name;
        owing.Creditor = creditor.Name;
        return owing;
      }),
    );
    return owings;
  }
}
