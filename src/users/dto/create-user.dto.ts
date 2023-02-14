import { IsEmail, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
    @MaxLength(15)
    @MinLength(6)
    userId: string;
    
    @MaxLength(20)
    @MinLength(6)
    //@Matches(/^\$2[ayb]\$[\d]\$[./A-Za-z0-9]$/)
    password: string;

    @IsEmail()
    email: string;
}

export class LoginUserDto {
    userId: string;
    password: string;
}

export class UserRequestDto {
    userId: string;
}
