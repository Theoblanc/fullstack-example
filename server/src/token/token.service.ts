import { InjectRepository } from '@nestjs/typeorm';
import { TokenType } from 'src/commons/enums/token-type.enum';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';

export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async save(token: string, type: TokenType) {
    const createdToken = await this.tokenRepository.create({ token, type });
    return createdToken;
  }
}
