import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/req/create-user.dto";
import { User } from "./entities/user.entity";
export declare class UsersRepository extends Repository<User> {
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
