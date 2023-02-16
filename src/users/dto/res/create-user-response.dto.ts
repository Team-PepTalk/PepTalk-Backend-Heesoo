import BaseResponse from "src/base-response.dto";

export class CreateUserResponseDto {
    nickname: string;

    constructor(nickname: string) {
        this.nickname = nickname;
    }

    static of(nickname: string) {
        return new CreateUserResponseDto(nickname);
    }
}

export class CreateUserResponse extends BaseResponse {
    data: CreateUserResponseDto;

    constructor(status: number, success: boolean, msg: string, data: CreateUserResponseDto) {
        super(status, success, msg);
        this.data = data;
    }


    static newResponse(successCode: SuccessCode, data: CreateUserResponseDto): CreateUserResponse {
        return new CreateUserResponse(200, true, successCode, data);
    }
}