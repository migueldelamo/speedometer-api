import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect', // Sustituir por la url de redirección de la cuenta de google
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/user.phonenumbers.read', // Solicitar acceso al número de teléfono
      ],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      phone: profile.phone,
    };
    done(null, user);
  }
}
