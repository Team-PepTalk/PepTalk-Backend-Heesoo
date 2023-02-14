import { UsersService } from './users.service';
import { CreateUserDto, UserRequestDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private readonly usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    login(req: any): Promise<{
        access_token: any;
    }>;
    me(req: any): any;
    existUserId(requestDto: UserRequestDto): Promise<import("./entities/user.entity").User>;
    updateUser(id: number, createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
