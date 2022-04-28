import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { Query } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDTO)
  async me(id: string) {
    return await this.userService.findOneById(id);
  }

  @Mutation(() => String)
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  login(@Args('input') input: LoginInput) {
    this.userService.login(input);
  }
}
