import { Controller, Get, Request, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginUserResponse } from "src/users/dto/res/login-user-response.dto";
import { AuthService } from "./auth.service";

@Controller("oauth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req, @Response() res): Promise<LoginUserResponse> {
        console.log("googleAuth redirect Controller start")
        const response = await this.authService.googleLogin({req, res});

        return LoginUserResponse.newResponse(SuccessCode.SOCIAL_LOGIN_USER_SUCCESS, response);
    }
}