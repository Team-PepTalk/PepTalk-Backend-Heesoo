import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,    
    ) {}

    async validateUser(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.usersService.findUserId(loginUserDto.userId);

        if (!(await bcrypt.compare(loginUserDto.password, user?.password ?? ''))) {
            return null;
        }

        return user;
    }

    async login(user: any) {
        const payload = { sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
