import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './auth.signin.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/user.dto';
import { ValidateDTO } from './auth.validate.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    @Post('signin')
    async SignIn(@Body() signInDTO: SignInDto) {
        return this.authService.SignIn(signInDTO);
    }
    @Post('signup')
    async SignUp(@Body() createUserDTO: CreateUserDTO) {
        return this.authService.SignUp(createUserDTO);
    }
    @Post('validate')
    async ValidateUser(@Body() validateDTO: ValidateDTO){
        return this.authService.ValidateUser(validateDTO);
    }
}
