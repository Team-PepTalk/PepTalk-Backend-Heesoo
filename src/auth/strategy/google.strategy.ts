import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope: ['email', 'profile'],
        })
    }

    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        console.log("guard start");
        console.log("profile: " + profile.displayName)
        const { name, emails, photos } = profile;
        return {
            email: emails[0].value,
            firstName: name.familyName,
            lastName: name.givenName,
            picture: photos[0].value,
            accessToken,
        }
        //done(null, user);
    }
}