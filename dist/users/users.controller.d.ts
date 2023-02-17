import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import BaseResponse from 'src/base-response.dto';
import { UpdateUserResponse } from './dto/res/update-user-response.dto';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
import { CreateUserRequestDto } from './dto/req/create-user-request.dto';
import { CreateUserResponse } from './dto/res/create-user-response.dto';
import { LoginUserResponse } from './dto/res/login-user-response.dto';
export declare class UsersController {
    private readonly usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(createUserRequestDto: CreateUserRequestDto, res: any): Promise<CreateUserResponse>;
    login(req: any, res: any): Promise<LoginUserResponse>;
    logOut(req: any, res: any): Promise<BaseResponse>;
    refresh(req: any, res: any): any;
    me(req: any): any;
    updateUserInfo(id: number, updateUserRequestDto: UpdateUserRequestDto): Promise<UpdateUserResponse>;
    deleteUser(id: number): BaseResponse;
}
