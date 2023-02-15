import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuthRedirect(req: any, res: any): Promise<{
        message: string;
        user: import("../users/entities/user.entity").User;
    }>;
}
