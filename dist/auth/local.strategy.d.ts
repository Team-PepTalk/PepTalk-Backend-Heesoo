import { AuthService } from "./auth.service";
declare const LocalStrategy_base: any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(userId: string, password: string): Promise<any>;
}
export {};
