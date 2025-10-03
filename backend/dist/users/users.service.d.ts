import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    updateEmail(id: string, newEmail: string): Promise<User>;
    findOne(id: string): Promise<User>;
    updateEmail1(id: string, email: string): Promise<User>;
}
