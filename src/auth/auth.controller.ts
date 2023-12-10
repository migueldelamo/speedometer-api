// auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  ConflictException,
  HttpException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from './google-oauth.guard';

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
  async signIn(@Body() credentials: { username: string; password: string }) {
    try {
      // Llama al servicio para manejar la lógica de autenticación
      const token = await this.authService.signIn(
        credentials.username,
        credentials.password,
      );
      return { access_token: token };
    } catch (error) {
      // Maneja cualquier error de autenticación y devuelve una respuesta adecuada
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() user: User) {
    const existingUser = await this.userService.findByUsername(user.username);
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Crear el nuevo usuario
    const newUser = await this.userService.createUser(user);

    // Generar y devolver el token JWT
    const token = await this.authService.signToken({
      username: newUser.username,
      password: newUser.password,
    });
    return { access_token: token };
  }
}
