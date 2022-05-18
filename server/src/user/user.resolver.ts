import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login.input';
import { UserDTO } from './dto/user.dto';
import { LoginReturnDTO } from 'src/auth/dto/login-return.dto';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDTO)
  me(@Args('id', { type: () => String }) id: string): Promise<UserDTO> {
    return this.userService.findOneById(id);
  }

  @Query(() => String)
  sayHi(): Promise<string> {
    return this.userService.sayHi();
  }

  @Mutation(() => UserDTO)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginReturnDTO)
  login(@Args('input') input: LoginInput) {
    // this.userService.login(input);
  }
}
