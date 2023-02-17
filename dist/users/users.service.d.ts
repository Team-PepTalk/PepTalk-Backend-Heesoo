import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
import { CreateUserRequestDto } from './dto/req/create-user-request.dto';
import { CreateUserResponseDto } from './dto/res/create-user-response.dto';
import { UpdateUserResponseDto } from './dto/res/update-user-response.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserResponseDto } from './dto/res/login-user-response.dto';
export declare class UsersService {
    private usersRepository;
    private authService;
    constructor(usersRepository: UsersRepository, authService: AuthService);
    transformPassword(user: CreateUserRequestDto): Promise<string>;
    createUser(createUserRequestDto: CreateUserRequestDto, res: any): Promise<CreateUserResponseDto>;
    login(user: User, res: any): Promise<LoginUserResponseDto>;
    findOneByEmail(email: string): Promise<User>;
    updateUserInfo(id: number, updateUserRequestDto: UpdateUserRequestDto): Promise<UpdateUserResponseDto>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
    setCurrentRefreshToken(refreshToken: string, id: number): Promise<void>;
    getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<User>;
    removeRefreshToken(id: number): Promise<import("typeorm").UpdateResult>;
    getById(id: number): Promise<User>;
}
