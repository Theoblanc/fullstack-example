import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Mail')
export class MailResolver {
  @Query(() => Boolean)
  isMailer() {
    return true;
  }
}
