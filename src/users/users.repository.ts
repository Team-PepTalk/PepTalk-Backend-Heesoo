import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/req/create-user.dto";
import { User } from "./entities/user.entity";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { userId, password, email } = createUserDto;

        const user = this.create({
            userId,
            password,
            email
        })

        await this.save(user);
        return user;
    }
}