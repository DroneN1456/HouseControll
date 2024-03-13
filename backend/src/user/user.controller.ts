import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
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
  @Get(':id/activate')
  @Redirect()
  async ActivateUser(@Param('id') userId) {
    return this.userService.ActivateUser(userId);
  }
  @Get('houses')
  async GetHouses(@Headers('token') token) {
    return this.userService.GetHouses(token);
  }
  @Get('profile')
  async GetProfile(@Headers('token') token) {
    return this.userService.GetProfile(token);
  }
  @Get('getKnownUsers')
  async GetKnownUsers(@Headers('token') token) {
    return this.userService.GetKnownUsers(token);
  }
}
