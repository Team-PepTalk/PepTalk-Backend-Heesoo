import { IsString } from "class-validator";


export class CreateUserRequestDto {
    @IsString()
    userId: string;

    @IsString()
    userPw: string;
}

export class CreateUserResponseDto {
    message: string;
}
