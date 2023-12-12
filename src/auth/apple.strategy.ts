import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-apple';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      callbackURL: 'http://localhost:3000/auth/apple-redirect', // Sustituir por la url de redirección de la cuenta de apple
      passReqToCallback: true,
      scope: ['name', 'email', 'phone'], // Solicitar acceso al número de teléfono
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { sub, email, name, phone } = profile;

    const user = {
      appleId: sub,
      email,
      name: name?.first,
      surname: name?.last,
      phone,
    };

    return done(null, user);
  }
}
