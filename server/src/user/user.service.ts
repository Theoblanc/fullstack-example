import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login.input';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const { name, email, password } = createUserInput;
    const user = await this.checkUserExists(email);

    if (!user) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    // 임시 토큰 TODO: JWT TOKEN 구현 후 연동
    const signupVerifyToken = '123' + new Date();

    const tempUser = await this.save({
      name,
      email,
      password,
      signupVerifyToken,
    });

    this.sendMemberJoinEmail(email, signupVerifyToken);

    return tempUser;
  }

  async findOneById(id): Promise<UserDTO> {
    try {
      const user = await this.usersRepository.findOne(id);

      return plainToClass(UserEntity, user);
    } catch (error) {}
  }

  private async checkUserExists(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  private async save({
    name,
    email,
    password,
    signupVerifyToken,
  }): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.usersRepository.save({
        name,
        email,
        password,
        signupVerifyToken,
      });

      return user;
    } catch (error) {}
  }

  private sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    this.mailService.sendMemberJoinVerification(email, signupVerifyToken);
  }

  async login(input: LoginInput) {
    const user = await this.usersRepository.findOne(input);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    return this.authService.login(user);
  }
}
