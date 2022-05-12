import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it.todo('should fail on exception');
    it.todo('should create user');
  });

  describe('FindOneById', () => {
    it.todo('should fail on exception');
    it.todo('should find user');
  });

  describe('checkUserExists', () => {
    it.todo('should fail on exception');
    it.todo('when user exist, return true');
    it.todo('when user dont exist, return false');
  });

  describe('save', () => {
    it.todo('should fail on exception');
    it.todo('should create user');
  });

  describe('sendMemberJoinEmail', () => {
    it.todo('should fail on exception');
    it.todo('should join email');
  });

  describe('login', () => {
    it.todo('should fail on exception (password id wrong)');
    it.todo('should fail on exception (can not find user)');
    it.todo('should success, return tokens (access token, refresh token)');
  });
});
