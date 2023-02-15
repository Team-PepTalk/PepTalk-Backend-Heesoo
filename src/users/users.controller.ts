import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put, UseGuards, Request, Inject, Response, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UserRequestDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refresh.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  // 종속성 주입
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}
  
  @Post("/create")
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    console.log("login controller start")
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
    

    //return this.authService.login(req.user);
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

  @Post("/existUserId")
  existUserId(@Body() requestDto: UserRequestDto) {
    return this.usersService.findOne(requestDto.userId);
  }

  @Put(':id')
  updateUser(@Param('id') id : number, @Body() createUserDto: CreateUserDto) {
    return this.usersService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
