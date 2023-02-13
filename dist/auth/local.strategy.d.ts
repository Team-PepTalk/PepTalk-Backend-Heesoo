import { Strategy } from "passport-local";
import { LoginUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validat(loginUserDto: LoginUserDto): Promise<any>;
}
export {};
