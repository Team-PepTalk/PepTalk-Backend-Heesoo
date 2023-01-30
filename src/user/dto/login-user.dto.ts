import { IsString } from "class-validator";

export class LoginRequestDto{
    @IsString()
    userId: string;

    @IsString()
    userPw: string;
}

export class LoginResponseDto{
    message: string;
}