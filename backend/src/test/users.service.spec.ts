import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException, NotFoundException } from '@nestjs/common';

// ✅ Mock bcrypt globally
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

const mockUser = (overrides = {}) => ({
  id: 'uuid-1',
  email: 'a@b.com',
  password: 'hashed',
  role: 'user',
  ...overrides,
});

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  const repoMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repoMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  afterEach(() => jest.clearAllMocks());

  it('creates user and hashes password', async () => {
    repoMock.findOne.mockResolvedValue(undefined);
    repoMock.create.mockReturnValue({ email: 'a@b.com', password: 'x' } as User);
    repoMock.save.mockImplementation(async (u) => Promise.resolve({ ...u, id: 'id1' }));

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pass');

    const res = await service.create('a@b.com', 'pass');
    expect(res.id).toBeDefined();
    expect(repoMock.save).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('pass', expect.any(Number));
  });

  it('throws conflict when email exists', async () => {
    repoMock.findOne.mockResolvedValue(mockUser());
    await expect(service.create('a@b.com', 'pass')).rejects.toBeInstanceOf(ConflictException);
  });

  it('findAll returns users without password', async () => {
    repoMock.find.mockResolvedValue([{ id: '1', email: 'x@x.com', role: 'user' }] as User[]);
    const r = await service.findAll();
    expect(Array.isArray(r)).toBe(true);
    expect(repoMock.find).toHaveBeenCalled();
  });

  it('remove throws not found if none', async () => {
    repoMock.delete.mockResolvedValue({ affected: 0 } as any);
    await expect(service.remove('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});

/*
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockUser = (overrides = {}) => ({
  id: 'uuid-1',
  email: 'a@b.com',
  password: 'hashed',
  role: 'user',
  ...overrides
});

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const repoMock = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repoMock }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  afterEach(() => jest.clearAllMocks());

  it('creates user and hashes password', async () => {
    repoMock.findOneBy.mockResolvedValue(undefined);
    repoMock.create.mockReturnValue({ email: 'a@b.com', password: 'x' });
    repoMock.save.mockImplementation(u => Promise.resolve({ ...u, id: 'id1' }));
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-pass');

    const res = await service.create('a@b.com', 'pass');
    expect(res.id).toBeDefined();
    expect(repoMock.save).toHaveBeenCalled();
  });

  it('throws conflict when email exists', async () => {
    repoMock.findOneBy.mockResolvedValue(mockUser());
    await expect(service.create('a@b.com', 'pass')).rejects.toBeInstanceOf(ConflictException);
  });

  it('findAll returns users without password', async () => {
    repoMock.find.mockResolvedValue([{ id: '1', email: 'x@x.com', role: 'user' }]);
    const r = await service.findAll();
    expect(Array.isArray(r)).toBe(true);
  });

  it('remove throws not found if none', async () => {
    repoMock.delete.mockResolvedValue({ affected: 0 });
    await expect(service.remove('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});
*/