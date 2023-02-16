
type BaseResponseType = {
    status: number;
    success: boolean;
    msg: string;
}

export default class BaseResponse {
    status: number;
    success: boolean;
    msg: string;

    constructor(status: number, success: boolean, msg: string) {
        this.status = status;
        this.success = success;
        this.msg = msg;
    }

    static of(status: number, success: boolean, msg: string): BaseResponse {
        return new BaseResponse(status, success, msg);
    }

    static toCustomErrorResponse(exceptionCode: ExceptionCode): BaseResponseType {
        return BaseResponse.of(400, false, exceptionCode);
    }

    static toSuccessResponse(successCode: SuccessCode): BaseResponseType {
        return BaseResponse.of(200, true, successCode);
    }
}