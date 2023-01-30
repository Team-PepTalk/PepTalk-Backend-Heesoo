import { Repository } from "typeorm";
import { User } from '../entities/user.entity';
export declare class UserRepository extends Repository<User> {
    findByName(firstName: string, lastName: string): Promise<User>;
}
