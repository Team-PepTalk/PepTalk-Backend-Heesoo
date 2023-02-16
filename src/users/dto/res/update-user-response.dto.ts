import BaseResponse from "src/base-response.dto";

export class UpdateUserResponseDto {
    nickname: string;
    email: string;

    constructor(nickname: string, email: string) {
        this.nickname = nickname;
        this.email = email;
    }

    static of(nickname: string, email: string) {
        return new UpdateUserResponseDto(nickname, email);
    }

}

export class UpdateUserResponse extends BaseResponse {
    data: UpdateUserResponseDto;

    constructor(status: number, success: boolean, msg: string, data: UpdateUserResponseDto) {
        super(status, success, msg);
        this.data = data;
    }

    static newResponse(successCode: SuccessCode, data: UpdateUserResponseDto): UpdateUserResponse  {
        return new UpdateUserResponse(200, true, successCode, data);
    }
}