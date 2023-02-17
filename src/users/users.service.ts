import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
import { CreateUserRequestDto } from './dto/req/create-user-request.dto';
import { CreateUserResponseDto } from './dto/res/create-user-response.dto';
import { UpdateUserResponseDto } from './dto/res/update-user-response.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserResponseDto } from './dto/res/login-user-response.dto';
import BaseResponse from 'src/base-response.dto';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}
  
  // 비밀번호 암호화
  async transformPassword(user: CreateUserRequestDto) {
    return user.password = await bcrypt.hash(user.password, 10);
  }

  // SignUp
  async createUser(createUserRequestDto: CreateUserRequestDto, res): Promise<CreateUserResponseDto> {
    const cryptedssword = await this.transformPassword(createUserRequestDto);
    
    const { nickname, password, email } = createUserRequestDto;
    const user = this.usersRepository.create({
      nickname,
      password : cryptedssword,
      email
    })

    const signUpUser = await this.usersRepository.save(user);

    const access = this.authService.getCookieWithJwtAccessToken(user.id);
    const refresh = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.setCurrentRefreshToken(refresh.refreshToken, user.id);

    res.cookie('Authentication', access.accessToken);
    res.cookie('Refresh', refresh.refreshToken);

    return CreateUserResponseDto.of(signUpUser.nickname);
  }

  // Login
  async login(user: User, res): Promise<LoginUserResponseDto> {
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);

    const {
      refreshToken,
      ...refreshOption
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return LoginUserResponseDto.of(user.nickname);
  }

  async logout(user: User, res) {
    const {
      accessOption,
      refreshOption,
    } = this.authService.getCookieForLogOut();
    await this.removeRefreshToken(user.id);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({email});
  }

  // update userInfo(회원정보수정)
  async updateUserInfo(id: number, updateUserRequestDto: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new HttpException("사용자를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
    }
    
    user.nickname = updateUserRequestDto.nickname;
    user.email = updateUserRequestDto.email;

    const updateUser = await this.usersRepository.save(user);
    return UpdateUserResponseDto.of(updateUser.nickname, updateUser.email);
  }

  // delete user(회원탈퇴)
  async deleteUser(id: number) {
    const user = await this.usersRepository.findOneById(id);

    if(!user) {
      throw new HttpException("사용자를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
    }

    return this.usersRepository.delete(user.id);
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
      throw new HttpException(`${id}의 사용자를 찾을 수 없습니다.`, HttpStatus.BAD_REQUEST);
    }
    return found;
  }

  
}