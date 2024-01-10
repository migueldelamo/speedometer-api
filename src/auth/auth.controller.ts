import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign In' })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() credentials: { email: string; password: string },
  ): Promise<Partial<User>> {
    try {
      return this.authService.signIn(credentials.email, credentials.password);
    } catch (error) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @ApiOperation({ summary: 'Sign up' })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() user: User): Promise<Partial<User>> {
    return this.authService.signUp(user);
  }

  @ApiOperation({ summary: 'Google Sign In' })
  @HttpCode(HttpStatus.OK)
  @Post('google-signin')
  async googleSignIn(@Body() user: Partial<User>): Promise<Partial<User>> {
    return this.authService.googleSignIn(user);
  }

  @ApiOperation({ summary: 'Apple Sign In' })
  @HttpCode(HttpStatus.OK)
  @Post('google-signin')
  async appleSignIn(@Body() user: Partial<User>): Promise<Partial<User>> {
    return this.authService.appleLogin(user);
  }
}
