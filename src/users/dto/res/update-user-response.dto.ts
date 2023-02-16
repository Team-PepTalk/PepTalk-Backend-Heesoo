import BaseResponse from "src/base-response.dto";

class UpdateUserResponseDto {
    userId: string;
    password: string;
    email: string;
}

export class UpdateUserResponse extends BaseResponse {
    data: UpdateUserResponseDto;

    constructor(status: number, success: boolean, msg: string, data: UpdateUserResponseDto) {
        super(status, success, msg);
        this.data = data;
    }

    /*
    of(status: number, success: boolean, msg: string, data: UpdateUserResponseDto): UpdateUserResponse {
        return new UpdateUserResponse(status, success, msg, data);
    }
    */

    static newResponse(successCode: SuccessCode, data: UpdateUserResponseDto): UpdateUserResponse  {
        return new UpdateUserResponse(200, true, successCode, data);
    }
}