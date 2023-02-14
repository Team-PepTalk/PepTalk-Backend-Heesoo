import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        //@Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        //@Inject(forwardRef(() => JwtService))
        private jwtService: JwtService,    
    ) {}

    async validateUser(userId: string, password: string): Promise<any> {
        console.log("auth service / validateUser method start")
        const user = await this.usersService.findOne(userId);

        console.log("auth service / validateUser method 비밀번호 비교 시작")
        // DB에는 해시된 암호만 저장 후 데이터 비교
        if (!(await bcrypt.compare(password, user?.password ?? ''))) {
            return null;
        }

        /*if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }*/
        console.log("user" + user);
        return user;
    }

    async login(user: any) {
        console.log("auth service / login method start")
        const payload = { sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
