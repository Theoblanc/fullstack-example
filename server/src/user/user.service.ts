import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly mailService: MailService) {}
  async create(createUserInput: CreateUserInput) {
    const { name, email, password } = createUserInput;
    await this.checkUserExists(email);

    // 임시 토큰 TODO: JWT TOKEN 구현 후 연동
    const signupVerifyToken = '123' + new Date();

    await this.save({
      name,
      email,
      password,
      signupVerifyToken,
    });

    return 'This action adds a new user';
  }

  private checkUserExists(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  private save({ name, email, password, signupVerifyToken }) {
    return; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.mailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
