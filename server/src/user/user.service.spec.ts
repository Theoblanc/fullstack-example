import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from 'src/commons/types/repository';
import { UserEntity } from './entities/user.entity';
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

const testUser3 = {
  id: 3,
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
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<UserEntity>;

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
    userRepository = module.get<MockRepository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('save', () => {
    it('return user entity', async () => {
      userRepository.save.mockResolvedValue(oneUser);
      const user = await userService.save(testUser1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(user).toEqual(testUser1);
    });

    it('should fail on exception', async () => {
      userRepository.save.mockRejectedValue(() => {
        throw new BadRequestException("can't save user in db");
      });

      expect(
        async () => await userService.save(testUser1),
      ).rejects.toThrowError(new BadRequestException("can't save user in db"));

      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      userRepository.findOne.mockResolvedValue(oneUser);

      const user = await userService.findOne(1);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(user).toEqual(testUser1);
    });
    it.todo('should return user by email');
    it('if user is not exist, return null', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const user = await userService.findOne(5);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(user).toBeNull();
    });
  });

  describe('sing up', () => {
    it('should return temp user', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      jest.spyOn(userService, 'signUp').mockImplementation(async () => oneUser);
      expect(await userService.signUp(testUser1)).toEqual(oneUser);
    });
  });
});
