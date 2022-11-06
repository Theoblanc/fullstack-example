import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { TokenType } from 'src/commons/enums/token-type.enum';
import { TokenService } from 'src/token/token.service';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './input/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  // RESPOITROY

  async save(properties: Partial<UserEntity>): Promise<UserEntity> {
    try {
      console.log('properties', properties);
      const user = await this.userRepository.save(properties);
      console.log('user', user);
      return plainToClass(UserEntity, user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("can't save user in db");
    }
  }

  //BUSINESS

  async findOne(option) {
    const user = await this.userRepository.findOne(option);
    return user;
  }

  async signUp(input: CreateUserInput): Promise<UserEntity> {
    let user = plainToClass(
      UserEntity,
      await this.findOne({ email: input.email }),
    );

    if (user) {
      throw new BadRequestException('User already exist');
    }

    // const generatedToken = await this.authService.generate(user);

    // const token = await this.tokenService.save(
    //   generatedToken,
    //   TokenType.SIGNUP_VERIFY,
    // );

    // 이메일 보내기

    console.log(user);
    console.log(input);

    user = await this.save(input);

    return user;
  }
}
