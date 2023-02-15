import { Controller, Get, Req, Request, Res, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
//import { Request, Response } from "express";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}
    
    /*
    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        console.log("googleAuth Controller start")
    }
    */

    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Request() req, @Response() res) {
        console.log("googleAuth redirect Controller start")
        return this.authService.googleLogin({req, res});
    }
}