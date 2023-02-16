import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import BaseResponse from 'src/base-response.dto';
import { UpdateUserResponse } from './dto/res/update-user-response.dto';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
import { CreateUserRequestDto } from './dto/req/create-user-request.dto';
import { CreateUserResponse } from './dto/res/create-user-response.dto';
export declare class UsersController {
    private readonly usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse>;
    login(req: any, res: any): Promise<any>;
    logOut(req: any, res: any): Promise<string>;
    refresh(req: any, res: any): any;
    me(req: any): any;
    updateUserInfo(id: number, updateUserRequestDto: UpdateUserRequestDto): Promise<UpdateUserResponse>;
    deleteUser(id: number): BaseResponse;
}
