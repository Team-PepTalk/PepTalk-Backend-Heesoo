import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private usersRepository;
    constructor(usersService: UsersService, jwtService: JwtService, usersRepository: UsersRepository);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    googleLogin({ req, res }: {
        req: any;
        res: any;
    }): Promise<{
        message: string;
        user: User;
    }>;
    getCookieWithJwtAccessToken(id: number): {
        accessToken: string;
        domain: string;
        path: string;
        httpOnly: boolean;
        maxAge: number;
    };
    getCookieWithJwtRefreshToken(id: number): {
        refreshToken: string;
        domain: string;
        path: string;
        httpOnly: boolean;
        maxAge: number;
    };
    getCookieForLogOut(): {
        accessOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
        refreshOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    };
}
