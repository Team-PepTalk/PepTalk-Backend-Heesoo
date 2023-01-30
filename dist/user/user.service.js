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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const UserRepository_1 = require("./Repository/UserRepository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(existingUser, createUserRequestDto) {
        if (existingUser === null) {
            await this.userRepository.save(createUserRequestDto);
            return "account created";
        }
        return "이미 회원가입 했습니다.";
    }
    async findUserId(createUserRequestDto) {
        const userId = createUserRequestDto.userId;
        const existingUser = await this.userRepository.findOneBy({ userId });
        return existingUser;
    }
    async loginUser(loginRequestDto, existingUser) {
        console.log(`test : ${existingUser}`);
        if (existingUser === null) {
            return "가입되지 않은 아이디입니다.";
        }
        else {
            const pwCorrect = await this.userRepository.findOne({
                where: {
                    userId: loginRequestDto.userId,
                    userPw: loginRequestDto.userPw
                }
            });
            console.log(`pwcorrect: ${pwCorrect}`);
            if (pwCorrect === null) {
                return "패스워드가 틀립니다.";
            }
            else {
                return "로그인 성공!";
            }
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map