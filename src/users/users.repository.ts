import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {}