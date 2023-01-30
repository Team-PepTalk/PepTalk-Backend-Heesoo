import { UserService } from './user.service';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponseDto>;
    loginUser(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto>;
}
