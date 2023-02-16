import { Strategy, VerifyCallback } from "passport-google-oauth20";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): {
        email: any;
        firstName: any;
        lastName: any;
        picture: any;
        accessToken: string;
    };
}
export {};
