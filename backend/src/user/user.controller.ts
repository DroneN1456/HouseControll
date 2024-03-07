import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async CreateUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.CreateUser(createUserDTO);
  }
  @Get(':id/expensesThisMonth')
  async GetExpensesThisMonth(
    @Param() params: any,
    @Headers('token') token,
  ): Promise<User> {
    return this.userService.GetExpensesThisMonth(params.id, token);
  }
  @Get('profile')
  async GetProfile(@Headers('token') token) {
    return this.userService.GetProfile(token);
  }
  @Get('allExceptMe')
  async GetAllExceptMe(@Headers('token') token) {
    return this.userService.GetAllExceptMe(token);
  }
}
