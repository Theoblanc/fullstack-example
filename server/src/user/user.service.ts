import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
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
}
