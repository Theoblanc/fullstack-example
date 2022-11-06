import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginReturnDTO } from './dto/login-return.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
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
