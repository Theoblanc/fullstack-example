import { JwtService } from '@nestjs/jwt';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(userId: string, username: string) {
    const payload = { username, id: userId, iat: Date.now() };
    return this.jwtService.sign(payload);
  }

  async verify(token: string) {
    return await this.jwtService.verify(token);
  }
}
