import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository
    ) {}
  
  // 비밀번호 암호화
  async transformPassword(user: CreateUserDto) {
    return user.password = await bcrypt.hash(user.password, 10);
    
  }

  // SignUp
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //return 'This action adds a new user';
    const cryptedssword = await this.transformPassword(createUserDto);
    
    const { userId, password, email } = createUserDto;
    const user = this.usersRepository.create({
      userId,
      password : cryptedssword,
      email
    })

    return await this.usersRepository.save(user);
    //return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    const found = await this.usersRepository.findOne({
      where: {
        userId : username
      }
    });

    if (!found) {
      throw new NotFoundException(`Can't find User with userid ${username}`);
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
