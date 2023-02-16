type BaseResponseType = {
    status: number;
    success: boolean;
    msg: string;
};
export default class BaseResponse {
    status: number;
    success: boolean;
    msg: string;
    constructor(status: number, success: boolean, msg: string);
    static of(status: number, success: boolean, msg: string): BaseResponse;
    static toCustomErrorResponse(exceptionCode: ExceptionCode): BaseResponseType;
    static toSuccessResponse(successCode: SuccessCode): BaseResponseType;
}
export {};
