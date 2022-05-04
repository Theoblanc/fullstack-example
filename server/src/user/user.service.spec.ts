import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

export class UsersRepositoryFake {
  public create(): void {
    return;
  }
  public async save(): Promise<void> {
    return;
  }
  public async remove(): Promise<void> {
    return;
  }
  public async findOne(): Promise<void> {
    return;
  }
}

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UsersRepositoryFake,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {});

  describe('FindOneById', () => {});
  describe('checkUserExists', () => {});
  describe('save', () => {});
  describe('sendMemberJoinEmail', () => {});
  describe('login', () => {});
});
