import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto, CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository
    ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //return 'This action adds a new user';

    const { userId, password } = createUserDto;
    const user = this.usersRepository.create({
      userId,
      password
    })

    await this.usersRepository.save(user);
    return user;
  }

  async existUserId (userRequestDto: CreateUserRequestDto) {
    const found = await this.usersRepository.findOne({ where: userRequestDto });
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Can't find User with userid ${userRequestDto.userId}`);
    }

    return found;
  }

  /*
 findUserByUserId(userRequestDto: CreateUserDto): Boolean {
  const found = this.user.userId === this.userRequestDto.userId ? true : false;
  
  if(!found) {
    throw new NotFoundException(`Can't find User with id ${userRequestDto}.`);
  }

  return found;
 }
 */

 /*
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
}
