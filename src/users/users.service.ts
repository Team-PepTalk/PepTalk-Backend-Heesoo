import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs';

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

  //Google SignUp
  async createGoogleSignUp(createUser) {}

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

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({email});
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

  // DB에 Refresh Token을 저장하기 때문에 해당 토큰을 가져오고, 갱신하고, 삭제함
  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(id, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.getById(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(id: number) {
    return this.usersRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
  
  async getById(id: number) {

    const found = await this.usersRepository.findOne({where: { id }});

    if (!found) {
      throw new NotFoundException(`Can't find User with userid ${id}`);
    }
    return found;
  }
}
