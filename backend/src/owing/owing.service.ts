import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwingDTO } from './owing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Owing } from './owing.schema';
import { Model } from 'mongoose';
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
    await this.authService.ValidateUser({ token });
    if (createOwingDTO.Creditor == createOwingDTO.Debtor) {
      throw new BadRequestException('Serio?');
    }

    const newOwing = new this.owingModel();
    console.log(createOwingDTO.Debtor, createOwingDTO.Creditor);
    const Debtor = await this.userModel.findById(createOwingDTO.Debtor);
    const Creditor = await this.userModel.findById(createOwingDTO.Creditor);
    if (Debtor == null || Creditor == null) {
      throw new NotFoundException('Debtor não encontrado.');
    }
    newOwing.DebtorId = Debtor._id.toString();
    newOwing.CreditorId = Creditor._id.toString();
    newOwing.Value = createOwingDTO.Value;
    newOwing.PendingValue = createOwingDTO.Value;
    newOwing.Status = 0;

    newOwing.save();
    console.log(newOwing);
    return newOwing;
  }

  async PayOwing(payOwingDTO: PayOwingDTO, token: string) {
    const payload = await this.authService.ValidateUser({ token });

    const owing = await this.owingModel.findById(payOwingDTO.OwingId);
    if (owing == null) {
      throw new NotFoundException('Deveção não encontrada.');
    }

    if (owing.Status != 0) {
      throw new BadRequestException('Deveção ja foi paga.');
    }
    if (payOwingDTO.Value <= 0 || payOwingDTO.Value > owing.PendingValue) {
      throw new BadRequestException('Valor inválido.');
    }

    const Debtor = await this.userModel.findById(owing.DebtorId);
    const Creditor = await this.userModel.findById(owing.CreditorId);

    if (Debtor == null || Creditor == null) {
      throw new BadRequestException();
    }

    if (Creditor.id == payload.UserId) {
      throw new BadRequestException(
        'Você não pode pagar uma dívida para você mesmo.',
      );
    }

    this.expenseService.CreateExpenseById(
      new CreateExpenseDTO(-payOwingDTO.Value, 'owing', Creditor.Name),
      Debtor.id,
    );
    this.expenseService.CreateExpenseById(
      new CreateExpenseDTO(payOwingDTO.Value, 'owing', Debtor.Name),
      Creditor.id,
    );

    owing.PendingValue -= payOwingDTO.Value;
    owing.PendingValue = Math.round(owing.PendingValue * 100) / 100;

    if (owing.PendingValue <= 0.01) {
      owing.PendingValue = 0;
      owing.Status = 1;
    }

    owing.save();

    return owing;
  }
  async FindActiveOwings(UserId: string) {
    const owings = await this.owingModel.find({
      $or: [
        {
          DebtorId: UserId,
          CreditorId: UserId,
        },
      ],
      Status: 0,
    });
    return owings;
  }
  async GetOwings(token: string) {
    const payload = await this.authService.ValidateUser({ token });
    const owings = await this.owingModel.find({
      $or: [
        {
          DebtorId: payload.UserId,
        },
        {
          CreditorId: payload.UserId,
        },
      ],
    });
    const mappedOwings = await Promise.all(
      owings.map(async (owing: any) => {
        const debtor = await this.userModel.findById(owing.DebtorId);
        const creditor = await this.userModel.findById(owing.CreditorId);
        owing.DebtorId = debtor.Name;
        owing.CreditorId = creditor.Name;
        owing.IsDebtor = debtor.id == payload.UserId;
        return {
          _id: owing._id,
          DebtorId: debtor.Name,
          CreditorId: creditor.Name,
          Value: owing.Value,
          PendingValue: owing.PendingValue,
          Status: owing.Status,
          IsDebtor: debtor.id == payload.UserId,
        };
      }),
    );

    return mappedOwings;
  }
}
