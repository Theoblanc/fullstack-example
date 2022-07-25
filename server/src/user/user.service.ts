import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // RESPOITROY

  async save(properties: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const user = await this.userRepository.save(properties);
      return plainToClass(UserEntity, user);
    } catch (error) {
      throw new BadRequestException("can't save user in db");
    }
  }

  //BUSINESS

  async findOne(option) {
    const user = await this.userRepository.findOne(option);
    return user;
  }

  async signUp(input: UserDTO): Promise<UserEntity> {
    const user = this.findOne(input.email);

    if (user) {
      throw new BadRequestException('User already exist');
    }

    // 이메일 보내기
    // 임시 토큰 TODO: JWT TOKEN 구현 후 연동

    const tempUser = await this.save(input);

    return tempUser;
  }
}
