import BaseResponse from "src/base-response.dto";

export class LoginUserResponseDto {
    nickname: string;

    constructor(nickname: string) {
        this.nickname = nickname;
    }

    static of(nickname: string) {
        return new LoginUserResponseDto(nickname);
    }
}

export class LoginUserResponse extends BaseResponse {
    data: LoginUserResponseDto;

    constructor(status: number, success: boolean, msg: string, data: LoginUserResponseDto) {
        super(status, success, msg);
        this.data = data;
    }


    static newResponse(successCode: SuccessCode, data: LoginUserResponseDto): LoginUserResponse {
        return new LoginUserResponse(200, true, successCode, data);
    }
}