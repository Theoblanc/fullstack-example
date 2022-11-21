import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenType } from 'src/commons/enums/token-type.enum';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async save(properties: Partial<TokenEntity>) {
    try {
      const createdToken = await this.tokenRepository.save(properties);
      console.log('createdToken', createdToken);
      return createdToken;
    } catch (error) {
      console.log(error);
    }
  }

  async find() {
    return await this.tokenRepository.find();
  }
}
