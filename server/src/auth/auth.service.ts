import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginReturnDTO } from './dto/login-return.dto';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async verify(token: string) {
    return await this.jwtService.verify(token);
  }

  generateTokens(user: UserEntity): LoginReturnDTO {
    const payload = { ...user };

    const accessToken = this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
