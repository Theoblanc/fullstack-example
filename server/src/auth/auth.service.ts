import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(userId: string, username: string) {
    const payload = { username, id: userId };
    return this.jwtService.sign(payload);
  }

  async verify(token: string) {
    return await this.jwtService.verify(token);
  }

  login(user: UserEntity) {
    const payload = { ...user };

    return this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '1d',
    });
  }
}
