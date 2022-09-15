import {ExtractJwt, Strategy} from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService : UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.SECRET
        })
    }

    async validate(payload: User) {
        const user = await this.userService.findOneByName(payload.name);
        if (!user) throw new UnauthorizedException();
        
        return user;
    }
}