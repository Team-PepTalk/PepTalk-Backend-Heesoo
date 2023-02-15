import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<import("../../users/entities/user.entity").User>;
}
export {};