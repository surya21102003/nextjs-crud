import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';

const user = { id: '1', email: 'a@b.com', role: 'user' };

describe('UsersController', () => {
  let controller: UsersController;
  const serviceMock = {
    create: jest.fn().mockResolvedValue(user),
    findAll: jest.fn().mockResolvedValue([user]),
    findOneById: jest.fn().mockResolvedValue(user),
    update: jest.fn().mockResolvedValue(user),
    remove: jest.fn().mockResolvedValue({ deleted: true })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('create', async () => {
    expect(await controller.create({ email: 'a@b.com', password: 'pass' })).toEqual(user);
  });

  it('findAll', async () => {
    expect(await controller.findAll()).toEqual([user]);
  });
});
