"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const local_auth_guard_1 = require("../auth/guard/local-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const jwt_refresh_guard_1 = require("../auth/guard/jwt-refresh.guard");
const base_response_dto_1 = __importDefault(require("../base-response.dto"));
const update_user_response_dto_1 = require("./dto/res/update-user-response.dto");
const update_user_request_dto_1 = require("./dto/req/update-user-request.dto");
const create_user_request_dto_1 = require("./dto/req/create-user-request.dto");
const create_user_response_dto_1 = require("./dto/res/create-user-response.dto");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async createUser(createUserRequestDto, res) {
        const response = await this.usersService.createUser(createUserRequestDto, res);
        return create_user_response_dto_1.CreateUserResponse.newResponse("\uD68C\uC6D0\uAC00\uC785\uC744 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.", response);
    }
    async login(req, res) {
        const user = req.user;
        const _a = this.authService.getCookieWithJwtAccessToken(user.id), { accessToken } = _a, accessOption = __rest(_a, ["accessToken"]);
        const _b = this.authService.getCookieWithJwtRefreshToken(user.id), { refreshToken } = _b, refreshOption = __rest(_b, ["refreshToken"]);
        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
        res.cookie('Authentication', accessToken, accessOption);
        res.cookie('Refresh', refreshToken, refreshOption);
        return user;
    }
    async logOut(req, res) {
        const { accessOption, refreshOption, } = this.authService.getCookieForLogOut();
        await this.usersService.removeRefreshToken(req.user.id);
        res.cookie('Authentication', '', accessOption);
        res.cookie('Refresh', '', refreshOption);
        return "logout success";
    }
    refresh(req, res) {
        const user = req.user;
        const _a = this.authService.getCookieWithJwtAccessToken(user.id), { accessToken } = _a, accessOption = __rest(_a, ["accessToken"]);
        res.cookie('Authentication', accessToken, accessOption);
        return user;
    }
    me(req) {
        return req.user;
    }
    async updateUserInfo(id, updateUserRequestDto) {
        console.log("updater user controller start");
        const response = await this.usersService.updateUserInfo(id, updateUserRequestDto);
        return update_user_response_dto_1.UpdateUserResponse.newResponse("\uD68C\uC6D0 \uC218\uC815\uC744 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.", response);
    }
    deleteUser(id) {
        this.usersService.deleteUser(id);
        return base_response_dto_1.default.toSuccessResponse("\uD68C\uC6D0 \uC0AD\uC81C\uB97C \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.");
    }
};
__decorate([
    (0, common_1.Post)("/signUp"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_request_dto_1.CreateUserRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_request_dto_1.UpdateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", base_response_dto_1.default)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map