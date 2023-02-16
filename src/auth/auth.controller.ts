import { Controller, Get, Request, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("oauth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Request() req, @Response() res) {
        console.log("googleAuth redirect Controller start")
        return this.authService.googleLogin({req, res});
    }
}