"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserResponse = void 0;
const base_response_dto_1 = __importDefault(require("../../../base-response.dto"));
class UpdateUserResponseDto {
}
class UpdateUserResponse extends base_response_dto_1.default {
    constructor(status, success, msg, data) {
        super(status, success, msg);
        this.data = data;
    }
    static newResponse(successCode, data) {
        return new UpdateUserResponse(200, true, successCode, data);
    }
}
exports.UpdateUserResponse = UpdateUserResponse;
//# sourceMappingURL=update-user-response.dto.js.map