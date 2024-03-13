import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Expense, ExpenseSchema } from 'src/expense/expense.schema';
import { AuthModule } from 'src/auth/auth.module';
import { OwingModule } from 'src/owing/owing.module';
import { House, HouseSchema } from 'src/house/house.schema';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Expense.name, schema: ExpenseSchema },
      { name: House.name, schema: HouseSchema },
    ]),
    forwardRef(() => AuthModule),
    OwingModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
