import { IsEmail, MaxLength, MinLength } from "class-validator";

export class UpdateUserRequestDto {
    @MaxLength(15)
    @MinLength(6)
    userId: string;

    //password: string;

    @IsEmail()
    email: string;
}