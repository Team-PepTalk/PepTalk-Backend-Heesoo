"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponse {
    constructor(status, success, msg) {
        this.status = status;
        this.success = success;
        this.msg = msg;
    }
    static of(status, success, msg) {
        return new BaseResponse(status, success, msg);
    }
    static toCustomErrorResponse(exceptionCode) {
        return BaseResponse.of(400, false, exceptionCode);
    }
    static toSuccessResponse(successCode) {
        return BaseResponse.of(200, true, successCode);
    }
}
exports.default = BaseResponse;
//# sourceMappingURL=base-response.dto.js.map