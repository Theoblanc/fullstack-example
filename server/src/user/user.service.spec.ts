import { Test, TestingModule } from '@nestjs/testing';

import { UserEntity } from './entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';

import { TokenEntity } from 'src/token/entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { UserModule } from './user.module';
import { UserService } from './user.service';

const testUser1 = {
  name: 'test1',
  email: 'test1@email.com',
  password: 'test1Password',
};

const testUser2 = {
  name: 'test2',
  email: 'test2@email.com',
  password: 'test2Password',
};

const oneUser = new UserEntity(
  testUser1.name,
  testUser1.email,
  testUser1.password,
);

const arrayUser = [
  new UserEntity(testUser1.name, testUser1.email, testUser1.password),
  new UserEntity(testUser2.name, testUser2.email, testUser2.password),
];

const mockUserRepository = () => ({
  save: jest.fn().mockResolvedValue(oneUser),
  find: jest.fn().mockResolvedValue(arrayUser),
  findOne: jest.fn().mockResolvedValue(oneUser),
  softDelete: jest.fn().mockResolvedValue(oneUser),
});

describe('UserService', () => {
  let userService: UserService;

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
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('HI', () => {
    const HI = userService.sayHi();
    expect('HI').toBe(HI);
  });

  // describe('create', () => {
  //   // Given
  //   const name = 'TEST';
  //   const email = 'test@naver.com';
  //   const password = 'password';
  //   // When
  //   const user = userService.create({
  //     name: 'TEST',
  //     email: 'test@naver.com',
  //     password: 'password',
  //   });

  //   // Then
  //   const expected = new UserEntity();
  //   expected.name = name;
  //   expected.email = email;
  //   expected.password = password;

  //   expect(expected).toEqual(user);
  //   expect(expected).toBeCalledTimes(1);
  // });

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
