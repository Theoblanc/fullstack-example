import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './input/login.input';
import { LoginDTO } from './dto/login-return.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ name });
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(input: LoginInput): Promise<LoginDTO> {
    const user = await this.usersService.findOne(input);

    if (!user) {
      //
      throw Error('error');
    }

    const payload = {
      username: user.name,
      sub: user.id,
    };

    const accessToken = await this.jwtService.sign({ payload });

    const token = await this.tokenService.save({
      token: this.jwtService.sign({ payload }),
    });

    await this.usersService.update({ id: user.id }, { token: token.id });

    return {
      refreshToken: token?.token,
      accessToken,
    };
  }

  // generate(user: UserEntity): string {
  //   const payload = { ...user };

  //   const token = this.jwtService.sign(payload, {
  //     expiresIn: '1d',
  //   });

  //   return token;
  // }

  // generateTokens(user: UserEntity): LoginReturnDTO {
  //   const payload = { ...user };

  //   const accessToken = this.jwtService.sign(payload, {
  //     secret: 'secret',
  //     expiresIn: '1d',
  //   });

  //   const refreshToken = this.jwtService.sign(payload, {
  //     secret: 'secret',
  //     expiresIn: '7d',
  //   });

  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }
}
