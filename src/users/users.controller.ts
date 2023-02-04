import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserRequestDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  // 종속성 주입
  constructor(private readonly usersService: UsersService) {}
  
  @Post("/create")
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post("/existUserId")
  existUserId(@Body() userRequestDto: CreateUserRequestDto) {
    return this.usersService.existUserId(userRequestDto);
  }

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
