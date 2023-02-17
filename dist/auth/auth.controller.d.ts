import { LoginUserResponse } from "src/users/dto/res/login-user-response.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuthRedirect(req: any, res: any): Promise<LoginUserResponse>;
}
