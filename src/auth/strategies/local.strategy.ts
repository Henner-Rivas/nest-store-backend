import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    console.log(
      '🚀 ~ file: auth.service.ts:10 ~ AuthService ~ valitedateUser ~ user',
      user,
    );
    if (!user) {
      throw new UnauthorizedException('Not allow');
    }

    return user;
  }
}
