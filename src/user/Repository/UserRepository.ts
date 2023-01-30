import { EntityRepository, Repository } from "typeorm";
import { User } from '../entities/user.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByName(firstName: string, lastName: string) { // 1-1
    return this.findOne({});
  }
}