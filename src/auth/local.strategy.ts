import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validat(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.authService.validateUser(loginUserDto);
        
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}