import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDTO } from './user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async CreateUser(@Body() createUserDTO: CreateUserDTO){
        return this.userService.CreateUser(createUserDTO);
    }
    @Get(':id/expensesThisMonth')
    async GetTest(@Param() params: any): Promise<User> {
        return this.userService.GetExpensesThisMonth(params.id);
    }
}
