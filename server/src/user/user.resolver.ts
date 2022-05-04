import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './input/create-user.input';
import { LoginInput } from './input/login.input';
import { UserDTO } from './dto/user.dto';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDTO)
  me(@Args('id', { type: () => String }) id: string): Promise<UserDTO> {
    return this.userService.findOneById(id);
  }

  @Mutation(() => UserDTO)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  login(@Args('input') input: LoginInput) {
    this.userService.login(input);
  }
}
