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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async transformPassword(user) {
        return user.password = await bcrypt.hash(user.password, 10);
    }
    async createUser(createUserDto) {
        const cryptedssword = await this.transformPassword(createUserDto);
        const { userId, password, email } = createUserDto;
        const user = this.usersRepository.create({
            userId,
            password: cryptedssword,
            email
        });
        return await this.usersRepository.save(user);
    }
    async findOne(username) {
        const found = await this.usersRepository.findOne({
            where: {
                userId: username
            }
        });
        if (!found) {
            throw new common_1.NotFoundException(`Can't find User with userid ${username}`);
        }
        return found;
    }
    async updateUser(id, createUserDto) {
        const user = await this.usersRepository.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User not found.`);
        }
        user.userId = createUserDto.userId;
        user.password = createUserDto.password;
        user.email = createUserDto.email;
        return await this.usersRepository.save(user);
    }
    async deleteUser(id) {
        const user = await this.usersRepository.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User not found.`);
        }
        return this.usersRepository.delete(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map