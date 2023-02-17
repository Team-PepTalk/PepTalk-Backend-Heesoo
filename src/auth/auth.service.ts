import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { JwtConfig } from 'src/configs/jwt-config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private jwtService: JwtService,
        private usersRepository: UsersRepository,   
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: User = await this.usersService.findOneByEmail(email);

        // DB에는 해시된 암호만 저장 후 데이터 비교
        if (!(await bcrypt.compare(password, user?.password ?? ''))) {
            throw new HttpException("로그인에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }
        
        console.log("user" + user.id);
        return user;
    }

    async login(user: any) {
        console.log("auth service / login method start")
        const payload = { sub: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async googleLogin({ req, res }) {
        console.log("google login service start");
        console.log("req.user.email: " + JSON.stringify(req.user));
        //1. 회원조회
        let user = await this.usersService.findOneByEmail(req.user.email);
        console.log("req.user.email: " + req.user.email);
        //2. 회원가입이 안되어있다면? 자동회원가입
        if (!user) {
            user = this.usersRepository.create({
                email: req.user.email,
                nickname: req.user.firstName,
                password: null,
            });

            await this.usersRepository.save(user); 
        }
        //3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송한다)        
        res.cookie('Authentication', req.user.accessToken);
        res.cookie('Refresh', req.user.refreshToken);
        res.redirect(
            "http://localhost:3000"
        );

        return {
            message: 'User information from google',
            user
        }
    }
    
    // AccessToken을 발급 받음
    getCookieWithJwtAccessToken(id: number) {
        console.log("auth service / getCookieWithJwtAccessToken method start");
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: JwtConfig.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: `${JwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`
        });
        /*const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get(
                'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            )}s`,
        });*/

        return {
            accessToken: token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge:
                JwtConfig.JWT_ACCESS_TOKEN_EXPIRATION_TIME * 1000,
        };
    }

    // RefreshToken을 발급 받음
    getCookieWithJwtRefreshToken(id: number) {
        console.log("auth service / getCookieWithJwtRefreshToken method start");
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: JwtConfig.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: `${JwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
        });

        return {
            refreshToken: token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 
                JwtConfig.JWT_REFRESH_TOKEN_EXPIRATION_TIME * 1000,
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
}
