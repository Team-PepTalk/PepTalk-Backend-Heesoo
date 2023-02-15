import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "src/configs/jwt-config";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    console.log("request: " + request?.cookies?.Refresh);
                    return request?.cookies?.Refresh;
                },
            ]),
            //secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            secretOrKey: JwtConfig.JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req, payload: any) {
        const refreshToken = req.cookies?.Refresh;
        return this.usersService.getUserIfRefreshTokenMatches(
            refreshToken,
            payload.id,
        );
    }

}