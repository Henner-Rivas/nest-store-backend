import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/token.model';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_SECRET_KEY,
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}
