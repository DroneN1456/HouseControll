import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.signin.dto';
import { CreateUserDTO } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';
import { ValidateDTO } from './auth.validate.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async SignIn(signInDTO: SignInDto) {
    const hashedPassword = await bcrypt.hash(
      signInDTO.Password,
      process.env.HASH_SALT,
    );

    signInDTO.Password = hashedPassword;

    const user = await this.userService.FindUser(
      signInDTO.Email,
      signInDTO.Password,
    );

    if (!user.UserId) {
      throw new UnauthorizedException('Senha ou Usuário incorretos.');
    }
    if (!user.IsActivated) {
      throw new BadRequestException(
        'Usuário não ativado, por favor cheque seu email.',
      );
    }

    const payload = { Name: user.Name, UserId: user.UserId };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
  async SignUp(createUserDTO: CreateUserDTO) {
    return await this.userService.CreateUser(createUserDTO);
  }
  async ValidateUser(validateDTO: ValidateDTO) {
    try {
      const payload = await this.jwtService.verifyAsync(validateDTO.token);
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Token inválido.');
    }
  }
}
