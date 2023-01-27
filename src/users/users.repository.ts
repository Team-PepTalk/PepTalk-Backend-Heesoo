import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository()
export class UsersRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto) {
        const { userId, password } = createUserDto;

        const user = this.create({
            userId,
            password
        })

        await this.save(user);
        return user;
    }
}