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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = __importStar(require("bcrypt"));
const create_user_response_dto_1 = require("./dto/res/create-user-response.dto");
const update_user_response_dto_1 = require("./dto/res/update-user-response.dto");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async transformPassword(user) {
        return user.password = await bcrypt.hash(user.password, 10);
    }
    async createUser(createUserRequestDto) {
        const cryptedssword = await this.transformPassword(createUserRequestDto);
        const { nickname, password, email } = createUserRequestDto;
        const user = this.usersRepository.create({
            userId: nickname,
            password: cryptedssword,
            email
        });
        const signUpUser = await this.usersRepository.save(user);
        return create_user_response_dto_1.CreateUserResponseDto.of(signUpUser.userId);
    }
    async findOneByEmail(email) {
        return await this.usersRepository.findOneBy({ email });
    }
    async updateUserInfo(id, updateUserRequestDto) {
        const user = await this.usersRepository.findOneById(id);
        if (!user) {
            throw new common_1.HttpException("사용자를 찾을 수 없습니다.", common_1.HttpStatus.BAD_REQUEST);
        }
        user.userId = updateUserRequestDto.userId;
        user.email = updateUserRequestDto.email;
        const updateUser = await this.usersRepository.save(user);
        return update_user_response_dto_1.UpdateUserResponseDto.of(updateUser.userId, updateUser.email);
    }
    async deleteUser(id) {
        const user = await this.usersRepository.findOneById(id);
        if (!user) {
            throw new common_1.HttpException("사용자를 찾을 수 없습니다.", common_1.HttpStatus.BAD_REQUEST);
        }
        return this.usersRepository.delete(user.id);
    }
    async setCurrentRefreshToken(refreshToken, id) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersRepository.update(id, { currentHashedRefreshToken });
    }
    async getUserIfRefreshTokenMatches(refreshToken, id) {
        const user = await this.getById(id);
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async removeRefreshToken(id) {
        return this.usersRepository.update(id, {
            currentHashedRefreshToken: null,
        });
    }
    async getById(id) {
        const found = await this.usersRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.HttpException(`${id}의 사용자를 찾을 수 없습니다.`, common_1.HttpStatus.BAD_REQUEST);
        }
        return found;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map