import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 async register(createUserDto: CreateUserDto) {
  const existing = await this.usersService.findByEmail(createUserDto.email);
  if (existing) throw new BadRequestException('Email already exists');

  const hashed = await bcrypt.hash(createUserDto.password, 10);
  let email: string = createUserDto.email;
  let password: string = hashed;
  const user = await this.usersService.create(email, password);


  return { id: user.id, email: user.email };
}


  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid aaa credentials');

   // const valid = await bcrypt.compare(password, user.password);
   // if (!valid) throw new BadRequestException('Invalid bbb credentials');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}



/*import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return {
      access_token: this.jwt.sign({ userId: user.id, email: user.email, role: user.role }),
    };
  }
}
*/