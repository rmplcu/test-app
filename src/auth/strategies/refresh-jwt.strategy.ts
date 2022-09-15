import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt.strategy";

@Injectable()
export class RefreshTokenStragegy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: JwtPayload) {
        const refresh_token = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload, //access token
            refresh_token
        }
    }
}