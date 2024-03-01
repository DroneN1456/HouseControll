import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseService } from './expense/expense.service';
import { ExpenseModule } from './expense/expense.module';
import { OwingController } from './owing/owing.controller';
import { OwingService } from './owing/owing.service';
import { OwingModule } from './owing/owing.module';
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_CONNECTION_STRING), UserModule, ExpenseModule, OwingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
