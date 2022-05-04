import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginReturnDTO } from './dto/login-return.dto';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(userId: string, username: string) {
    const payload = { username, id: userId };
    return this.jwtService.sign(payload);
  }

  async verify(token: string) {
    return await this.jwtService.verify(token);
  }

  login(user: UserEntity): LoginReturnDTO {
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
