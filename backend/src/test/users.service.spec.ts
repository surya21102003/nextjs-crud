import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    mockRepo.findOne.mockResolvedValueOnce(null);
    mockRepo.create.mockReturnValue({ email: 'test@test.com', password: 'hashed' });
    mockRepo.save.mockResolvedValueOnce({ id: '1', email: 'test@test.com' });

    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashed');

    const result = await service.create('test@test.com', 'password');
    expect(result).toEqual({ id: '1', email: 'test@test.com' });
    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
  });

  it('should throw ConflictException if email exists', async () => {
    mockRepo.findOne.mockResolvedValueOnce({ id: '1', email: 'test@test.com' });
    await expect(service.create('test@test.com', 'password')).rejects.toThrow(ConflictException);
  });

  it('should return all users', async () => {
    const users = [{ id: '1', email: 'a@test.com' }];
    mockRepo.find.mockResolvedValue(users);
    expect(await service.findAll()).toEqual(users);
  });

  it('should find one user by id', async () => {
    const user = { id: '1', email: 'a@test.com' };
    mockRepo.findOne.mockResolvedValue(user);
    expect(await service.findOne('1')).toEqual(user);
  });

  it('should throw NotFoundException if user not found', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('wrong-id')).rejects.toThrow(NotFoundException);
  });

  it('should remove a user successfully', async () => {
    mockRepo.delete.mockResolvedValue({ affected: 1 });
    expect(await service.remove('1')).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if delete fails', async () => {
    mockRepo.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });

  it('should update email successfully', async () => {
    const user = { id: '1', email: 'old@test.com', save: jest.fn() };
    mockRepo.findOne.mockResolvedValue(user);
    const result = await service.updateEmail('1', 'new@test.com');
    expect(result.email).toBe('new@test.com');
    expect(user.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException when updating email of non-existent user', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    await expect(service.updateEmail('wrong-id', 'new@test.com')).rejects.toThrow(NotFoundException);
  });
});
