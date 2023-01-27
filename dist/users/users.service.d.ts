import { CreateUserDto, CreateUserRequestDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private usersRepository;
    private user;
    private userRequestDto;
    constructor(usersRepository: UsersRepository, user: User, userRequestDto: CreateUserRequestDto);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserByUserId(userRequestDto: CreateUserDto): Boolean;
}
