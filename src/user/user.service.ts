import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';
import { LoginRequestDto } from './dto/login-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './Repository/UserRepository';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ){}

  async createUser(existingUser: User, createUserRequestDto: CreateUserRequestDto): Promise<string> {
    if (existingUser === null){
      await this.userRepository.save(createUserRequestDto);
      return "account created";
    }
    return "이미 회원가입 했습니다.";
  }

  async findUserId(createUserRequestDto: CreateUserRequestDto):Promise<User> {
    const userId = createUserRequestDto.userId;
    const existingUser = await this.userRepository.findOneBy({userId});
    return existingUser;
  }

  async loginUser(loginRequestDto : LoginRequestDto, existingUser: User): Promise<string>{
    console.log(`test : ${existingUser}`);
    if (existingUser === null){
      return "가입되지 않은 아이디입니다.";
    }else{
      const pwCorrect: User = await this.userRepository.findOne({
        where: {
          userId : loginRequestDto.userId,
          userPw : loginRequestDto.userPw
        }
      });
      console.log(`pwcorrect: ${pwCorrect}`);
      if (pwCorrect === null){
        return "패스워드가 틀립니다.";
      }else{
        return "로그인 성공!";
      }
    }
  }

  /*findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
