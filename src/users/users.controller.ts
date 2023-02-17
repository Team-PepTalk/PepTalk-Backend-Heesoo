import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put, UseGuards, Request, Inject, Response, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import BaseResponse from 'src/base-response.dto';
import { UpdateUserResponse } from './dto/res/update-user-response.dto';
import { UpdateUserRequestDto } from './dto/req/update-user-request.dto';
import { CreateUserRequestDto } from './dto/req/create-user-request.dto';
import { CreateUserResponse } from './dto/res/create-user-response.dto';
import { LoginUserResponse } from './dto/res/login-user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}
  
  @Post("/signUp")
  async createUser(@Body(ValidationPipe) createUserRequestDto: CreateUserRequestDto, @Response({ passthrough: true }) res): Promise<CreateUserResponse> {
    const response = await this.usersService.createUser(createUserRequestDto, res);

    return CreateUserResponse.newResponse(SuccessCode.CREATE_USER_SUCCESS, response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response({ passthrough: true }) res): Promise<LoginUserResponse> {
    const user = req.user;
    const response = await this.usersService.login(user, res);

    return LoginUserResponse.newResponse(SuccessCode.LOGIN_USER_SUCCESS, response);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout')
  async logOut(@Request() req, @Response({ passthrough: true }) res): Promise<BaseResponse>{
    const user = req.user;
    await this.usersService.logout(user, res);

    return BaseResponse.toSuccessResponse(SuccessCode.LOGOUT_USER_SUCCESS);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  refresh(@Request() req, @Response({ passthrough: true }) res): BaseResponse{
    const user = req.user;
    this.usersService.refresh(user, res);

    return BaseResponse.toSuccessResponse(SuccessCode.ACCESSTOKEN_USER_SUCCESS);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  me (@Request() req) {
    return req.user;
  }

  //@UseGuards(JwtRefreshGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserInfo(@Param('id') id : number, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<UpdateUserResponse> {
    console.log("updater user controller start");
    const response = await this.usersService.updateUserInfo(id, updateUserRequestDto);
    return UpdateUserResponse.newResponse(SuccessCode.UPDATE_USER_SUCCESS, response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number): BaseResponse {

    this.usersService.deleteUser(id);
    return BaseResponse.toSuccessResponse(SuccessCode.DELETE_USER_SUCCESS);
  }
}
