import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    updateEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    mockService.findAll.mockResolvedValue([{ id: '1', email: 'a@test.com' }]);
    expect(await controller.findAll()).toEqual([{ id: '1', email: 'a@test.com' }]);
  });

  it('should return one user', async () => {
    mockService.findOne.mockResolvedValue({ id: '1', email: 'a@test.com' });
    expect(await controller.findOne('1')).toEqual({ id: '1', email: 'a@test.com' });
  });

  it('should throw NotFoundException when user not found', async () => {
    mockService.findOne.mockRejectedValue(new NotFoundException());
    await expect(controller.findOne('wrong-id')).rejects.toThrow(NotFoundException);
  });

  it('should update user email', async () => {
    const updatedUser = { id: '1', email: 'new@test.com' };
    mockService.updateEmail.mockResolvedValue(updatedUser);
    expect(await controller.updateEmail({ user: { userId: '1' } }, { newEmail: 'new@test.com' }))
      .toEqual(updatedUser);
  });
});
