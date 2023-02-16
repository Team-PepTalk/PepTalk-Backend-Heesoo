import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    //TODO login할 때, username을 email로 바꾸기
    async validate(email: string, password: string): Promise<any> {
        console.log("guard start");
        const user = await this.authService.validateUser(email, password);
        
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}