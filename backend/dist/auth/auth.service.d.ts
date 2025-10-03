import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
