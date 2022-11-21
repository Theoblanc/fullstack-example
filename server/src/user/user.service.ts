import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';
import { FindConditions, Repository } from 'typeorm';
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
      const user = await this.userRepository.save(properties);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException("can't save user in db");
    }
  }

  //BUSINESS

  async findOne(
    option: FindConditions<UserEntity>,
  ): Promise<UserEntity> | null {
    try {
      const user = await this.userRepository.findOne(option);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async update(criteria: FindConditions<UserEntity>, partialEntity) {
    try {
      await this.userRepository.update(criteria, partialEntity);
    } catch (error) {
      console.log('updateError', error);
    }
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
