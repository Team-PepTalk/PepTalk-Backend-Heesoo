import { IsEmail, MaxLength, MinLength } from "class-validator";

export class UpdateUserRequestDto {

    @MaxLength(7)
    @MinLength(3)
    nickname: string;

    @IsEmail()
    email: string;
}