import BaseResponse from "src/base-response.dto";
export declare class LoginUserResponseDto {
    nickname: string;
    constructor(nickname: string);
    static of(nickname: string): LoginUserResponseDto;
}
export declare class LoginUserResponse extends BaseResponse {
    data: LoginUserResponseDto;
    constructor(status: number, success: boolean, msg: string, data: LoginUserResponseDto);
    static newResponse(successCode: SuccessCode, data: LoginUserResponseDto): LoginUserResponse;
}
