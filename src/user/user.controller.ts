import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginRequestDto, LoginResponseDto } from './dto/login-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createuser')
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    const existingUser: User = await this.userService.findUserId(createUserRequestDto);
    const message: string = await this.userService.createUser(existingUser, createUserRequestDto);

    const response = new CreateUserResponseDto();
    response.message = message;
    return response;//직렬화??
  }

  @Post('/login')
  async loginUser(@Body() loginRequestDto : LoginRequestDto){
    const existingUser = await this.userService.findUserId(loginRequestDto);
    const message = await this.userService.loginUser(loginRequestDto, existingUser);
    
    const response = new LoginResponseDto();
    response.message = message;
    return response;
    //this.userService.loginUser(existingUser, loginRequestDto);
  }

  /*@Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }*/
}
