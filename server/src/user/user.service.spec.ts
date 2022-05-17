import { Test, TestingModule } from '@nestjs/testing';

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
  // let mailService: MailService;
  // let authService: AuthService;
  // let tokenService: TokenService;
  // let usersRepository: Repository<UserEntity>;

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
    // mailService = module.get<MailService>(MailService);
    // authService = module.get<AuthService>(AuthService);
    // tokenService = module.get<TokenService>(TokenService);
    // usersRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    // Given
    const name = 'TEST';
    const email = 'test@naver.com';
    const password = 'password';
    // When
    const user = userService.create({
      name: 'TEST',
      email: 'test@naver.com',
      password: 'password',
    });

    // Then
    const expected = new UserEntity();
    expected.name = name;
    expected.email = email;
    expected.password = password;

    expect(expected).toEqual(user);
    expect(expected).toBeCalledTimes(1);
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
