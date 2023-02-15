"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const users_repository_1 = require("../users/users.repository");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("../configs/jwt-config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, usersRepository, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
        this.configService = configService;
    }
    async validateUser(userId, password) {
        var _a;
        console.log("auth service / validateUser method start");
        const user = await this.usersService.findOne(userId);
        console.log("auth service / validateUser method 비밀번호 비교 시작");
        if (!(await bcrypt.compare(password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : ''))) {
            return null;
        }
        console.log("user" + user.id);
        return user;
    }
    async login(user) {
        console.log("auth service / login method start");
        const payload = { sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async googleLogin({ req, res }) {
        console.log("google login service start");
        console.log("req.user.email: " + JSON.stringify(req.user));
        let user = await this.usersService.findOneByEmail(req.user.email);
        console.log("req.user.email: " + req.user.email);
        if (!user) {
            user = this.usersRepository.create({
                email: req.user.email,
                userId: req.user.email,
                password: "password",
            });
            await this.usersRepository.save(user);
        }
        res.cookie('Authentication', req.user.accessToken);
        res.cookie('Refresh', req.user.refreshToken);
        res.redirect(process.env.GOOGLE_REDIRECT_URL);
        return {
            message: 'User information from google',
            user
        };
    }
    getCookieWithJwtAccessToken(id) {
        console.log("auth service / getCookieWithJwtAccessToken method start");
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: jwt_config_1.JwtConfig.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: `${jwt_config_1.JwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`
        });
        return {
            accessToken: token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: jwt_config_1.JwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME * 1000,
        };
    }
    getCookieWithJwtRefreshToken(id) {
        console.log("auth service / getCookieWithJwtRefreshToken method start");
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: jwt_config_1.JwtConfig.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: `${jwt_config_1.JwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
        });
        return {
            refreshToken: token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: jwt_config_1.JwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME * 1000,
        };
    }
    getCookieForLogOut() {
        console.log("auth service / getCookieForLogOut method start");
        return {
            accessOption: {
                domain: 'localhost',
                path: '/',
                httpOnly: true,
                maxAge: 0,
            },
            refreshOption: {
                domain: 'localhost',
                path: '/',
                httpOnly: true,
                maxAge: 0,
            },
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        users_repository_1.UsersRepository,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map