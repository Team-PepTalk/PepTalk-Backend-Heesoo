import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    transformPassword(user: CreateUserDto): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
    updateUser(id: number, createUserDto: CreateUserDto): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
