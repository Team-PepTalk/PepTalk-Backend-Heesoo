import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put, UseGuards, Request, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UserRequestDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  me (@Request() req) {
    return req.user;
  }

  /*
  @Post("/existUserId")
  existUserId(@Body() requestDto: UserRequestDto) {
    console.log("controller");
    return this.usersService.findUserId(requestDto.userId);
  }
  */

  @Put(':id')
  updateUser(@Param('id') id : number, @Body() createUserDto: CreateUserDto) {
    return this.usersService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  /*
  @Post("/findByUserId")
  findUserId(@Body() userRequestDto: CreateUserDto) {
    return this.usersService.findUserByUserId(userRequestDto);
  }
  */

  /*
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  */
}
