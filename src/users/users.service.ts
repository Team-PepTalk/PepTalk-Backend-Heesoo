import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateUserDto, CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    
    private user: User,
    private userRequestDto: CreateUserRequestDto,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    //return 'This action adds a new user';
    return this.usersRepository.createUser(createUserDto);
  }

 findUserByUserId(userRequestDto: CreateUserDto): Boolean {
  const found = this.user.userId === this.userRequestDto.userId ? true : false;

  if(!found) {
    throw new NotFoundException(`Can't find User with id ${userRequestDto}.`);
  }

  return found;
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
