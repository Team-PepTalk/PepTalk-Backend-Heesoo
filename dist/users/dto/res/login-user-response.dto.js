"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserResponse = exports.LoginUserResponseDto = void 0;
const base_response_dto_1 = __importDefault(require("../../../base-response.dto"));
class LoginUserResponseDto {
    constructor(nickname) {
        this.nickname = nickname;
    }
    static of(nickname) {
        return new LoginUserResponseDto(nickname);
    }
}
exports.LoginUserResponseDto = LoginUserResponseDto;
class LoginUserResponse extends base_response_dto_1.default {
    constructor(status, success, msg, data) {
        super(status, success, msg);
        this.data = data;
    }
    static newResponse(successCode, data) {
        return new LoginUserResponse(200, true, successCode, data);
    }
}
exports.LoginUserResponse = LoginUserResponse;
//# sourceMappingURL=login-user-response.dto.js.map