import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserId(userId: string): Promise<User | undefined>;
    updateUser(id: number, createUserDto: CreateUserDto): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
