import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserRequestDto {
    @MaxLength(7)
    @MinLength(2)
    nickname: string;
    
    @MaxLength(20)
    @MinLength(6)
    //@Matches(/^\$2[ayb]\$[\d]\$[./A-Za-z0-9]$/)
    password: string;

    @IsEmail()
    email: string;
}