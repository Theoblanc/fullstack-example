import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-return.dto';
import { LoginInput } from './input/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  authHi(): string {
    return 'hi';
  }

  @Mutation(() => LoginDTO)
  login(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
