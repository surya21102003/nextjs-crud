import { UsersService } from './users.service';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    create(body: {
        email: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    findAll(): Promise<import("./user.entity").User[]>;
    findOneme(id: string): Promise<import("./user.entity").User>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    updateEmail(id: string, body: {
        email: string;
    }): Promise<import("./user.entity").User>;
}
