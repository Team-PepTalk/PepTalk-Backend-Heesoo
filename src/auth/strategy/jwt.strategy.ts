import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "src/configs/jwt-config";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.Authentiation;
                },
            ]),
            secretOrKey: JwtConfig.JWT_ACCESS_TOKEN_SECRET,
            //secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
            //secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                /*jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: jwtConstants.secret,*/
        });
    }

    async validate(payload: any) {
        return this.usersService.getById(payload.id);
        //return { userUid: payload.userUid };
    }
}