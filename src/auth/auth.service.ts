import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
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

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
          }
          return null;
    }

    async login(user: any) {
        const payload = { sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
