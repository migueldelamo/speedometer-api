// auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  HttpException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { GoogleStrategy } from './google.strategy';
import { AppleStrategy } from './apple.strategy';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() credentials: { email: string; password: string },
  ): Promise<{
    access_token: string;
    user: Partial<User>;
  }> {
    try {
      // Llama al servicio para manejar la lógica de autenticación
      return this.authService.signIn(credentials.email, credentials.password);
    } catch (error) {
      // Maneja cualquier error de autenticación y devuelve una respuesta adecuada
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('google-redirect')
  @UseGuards(GoogleStrategy)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @Get('apple-redirect')
  @UseGuards(AppleStrategy)
  appleAuthRedirect(@Request() req) {
    return this.authService.appleLogin(req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() user: User): Promise<{
    access_token: string;
    user: Partial<User>;
  }> {
    return this.authService.signUp(user);
  }
}
