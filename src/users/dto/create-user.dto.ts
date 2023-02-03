import { IsEmail, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
    @MaxLength(6)
    @MinLength(15)
    userId: string;
    
    @MaxLength(6)
    @MinLength(20)
    @Matches(RegExp('^?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]*$'))
    password: string;

    @IsEmail()
    email: string;
}

export class CreateUserRequestDto {
    userId: string;
}
