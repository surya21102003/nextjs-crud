import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(email: string, password: string) {
    const exists = await this.repo.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashed });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }
/*
  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }*/

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async remove(id: string) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException();
    return { deleted: true };
  }
  async updateEmail(id: string, newEmail: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const emailExists = await this.repo.findOne({ where: { email: newEmail } });
    if (emailExists && emailExists.id !== id) {
      throw new ConflictException('Email already in use');
    }

    user.email = newEmail;
    return this.repo.save(user);
  }
  async findOne(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateEmail1(id: string, email: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.email = email;
    return this.repo.save(user);
  }

}
