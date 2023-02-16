import { CreateUserDto } from './dto/req/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    transformPassword(user: CreateUserDto): Promise<string>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    createGoogleSignUp(createUser: any): Promise<void>;
    findOne(username: string): Promise<User | undefined>;
    findOneByEmail(email: string): Promise<User>;
    updateUser(id: number, updateUserRequestDto: UpdateUserRequestDto): Promise<User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    setCurrentRefreshToken(refreshToken: string, id: number): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<User>;
    removeRefreshToken(id: number): Promise<import("typeorm").UpdateResult>;
    getById(id: number): Promise<User>;
}
