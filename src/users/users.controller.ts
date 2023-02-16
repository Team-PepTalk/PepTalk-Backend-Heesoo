import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put, UseGuards, Request, Inject, Response, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UserRequestDto } from './dto/req/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import BaseResponse from 'src/base-response.dto';
import { UpdateUserResponse } from './dto/res/update-user-response.dto';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
import { CreateUserRequestDto } from './dto/req/create-user-request.dto';
import { CreateUserResponse } from './dto/res/create-user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}
  
  @Post("/create")
  async createUser(@Body(ValidationPipe) createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponse> {
    const response = await this.usersService.createUser(createUserRequestDto);
    return CreateUserResponse.newResponse(SuccessCode.CREATE_USER_SUCCESS, response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);

    const {
      refreshToken,
      ...refreshOption
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logOut(@Request() req, @Response({ passthrough: true }) res) {
    const {
      accessOption,
      refreshOption,
    } = this.authService.getCookieForLogOut();
    await this.usersService.removeRefreshToken(req.user.userId);

    res.cookie('Authentication', '', accessOption);
    res.cookie('Refresh', '', refreshOption);

    return "logout success";
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@Request() req, @Response({ passthrough: true })res){
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);
    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  me (@Request() req) {
    return req.user;
  }

  @Put(':id')
  async updateUserInfo(@Param('id') id : number, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<UpdateUserResponse> {
    const response = await this.usersService.updateUserInfo(id, updateUserRequestDto);
    return UpdateUserResponse.newResponse(SuccessCode.UPDATE_USER_SUCCESS, response);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): BaseResponse {
    this.usersService.deleteUser(id);
    return BaseResponse.toSuccessResponse(SuccessCode.DELETE_USER_SUCCESS);
  }
}
