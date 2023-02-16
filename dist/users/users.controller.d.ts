import { UsersService } from './users.service';
import { CreateUserDto, UserRequestDto } from './dto/req/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import BaseResponse from 'src/base-response.dto';
import { UpdateUserResponse } from './dto/res/update-user-response.dto';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
export declare class UsersController {
    private readonly usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    login(req: any, res: any): Promise<any>;
    logOut(req: any, res: any): Promise<string>;
    refresh(req: any, res: any): any;
    me(req: any): any;
    existUserId(requestDto: UserRequestDto): Promise<import("./entities/user.entity").User>;
    updateUser(id: number, updateUserRequestDto: UpdateUserRequestDto): UpdateUserResponse;
    deleteUser(id: number): BaseResponse;
}
