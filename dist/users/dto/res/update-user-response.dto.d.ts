import BaseResponse from "src/base-response.dto";
export declare class UpdateUserResponseDto {
    nickname: string;
    email: string;
    constructor(nickname: string, email: string);
    static of(nickname: string, email: string): UpdateUserResponseDto;
}
export declare class UpdateUserResponse extends BaseResponse {
    data: UpdateUserResponseDto;
    constructor(status: number, success: boolean, msg: string, data: UpdateUserResponseDto);
    static newResponse(successCode: SuccessCode, data: UpdateUserResponseDto): UpdateUserResponse;
}
