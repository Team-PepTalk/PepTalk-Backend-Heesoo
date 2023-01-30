import { CreateUserRequestDto } from './dto/create-user.dto';
import { LoginRequestDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './Repository/UserRepository';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    createUser(existingUser: User, createUserRequestDto: CreateUserRequestDto): Promise<string>;
    findUserId(createUserRequestDto: CreateUserRequestDto): Promise<User>;
    loginUser(loginRequestDto: LoginRequestDto, existingUser: User): Promise<string>;
}
