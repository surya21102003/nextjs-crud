import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should login with correct credentials', async () => {
    const hashed = await bcrypt.hash('mypassword', 10);
    (usersService.findByEmail as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: hashed,
    });

    const result = await service.login('test@example.com', 'mypassword');
    expect(result).toHaveProperty('access_token');
  });

  it('should throw error on wrong password', async () => {
    const hashed = await bcrypt.hash('mypassword', 10);
    (usersService.findByEmail as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: hashed,
    });

    await expect(service.login('test@example.com', 'wrongpass')).rejects.toThrow();
  });
});
