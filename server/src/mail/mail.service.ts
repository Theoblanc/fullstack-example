import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendMemberJoinVerification(email: string, signupVerifyToken: string) {
    return true;
  }
}
