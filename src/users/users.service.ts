import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto, UserRequestDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository
    ) {}

  // SignUp
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //return 'This action adds a new user';

    const { userId, password, email } = createUserDto;
    const user = this.usersRepository.create({
      userId,
      password,
      email
    })

    await this.usersRepository.save(user);
    return user;
  }

  // find userId
  async findUserId(userId: string): Promise<User | undefined> {
    console.log("service start");
    const found = await this.usersRepository.findOne({ 
      where : {
        userId
      }
    });
    console.log(found);

    if (!found) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND,);
      //throw new NotFoundException(`Can't find User with userid ${userId}`);
    }

    return found;
  }

  // update user(회원수정)
  async updateUser(id: number, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    user.userId = createUserDto.userId;
    user.password = createUserDto.password;
    user.email = createUserDto.email;

    return await this.usersRepository.save(user);
  }

  // delete user(회원탈퇴)
  async deleteUser(id: number) {
    const user = await this.usersRepository.findOneById(id);

    if(!user) {
      throw new NotFoundException(`User not found.`);
    }

    return this.usersRepository.delete(user);
  }

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
