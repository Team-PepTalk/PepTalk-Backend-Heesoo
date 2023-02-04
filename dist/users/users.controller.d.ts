import { UsersService } from './users.service';
import { CreateUserDto, CreateUserRequestDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    existUserId(userRequestDto: CreateUserRequestDto): Promise<import("./entities/user.entity").User>;
    updateUser(id: number, createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    deleteUser(id: number): Promise<import("typeorm").DeleteResult>;
}
