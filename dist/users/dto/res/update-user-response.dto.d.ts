import BaseResponse from "src/base-response.dto";
declare class UpdateUserResponseDto {
    userId: string;
    password: string;
    email: string;
}
export declare class UpdateUserResponse extends BaseResponse {
    data: UpdateUserResponseDto;
    constructor(status: number, success: boolean, msg: string, data: UpdateUserResponseDto);
    static newResponse(successCode: SuccessCode, data: UpdateUserResponseDto): UpdateUserResponse;
}
export {};
