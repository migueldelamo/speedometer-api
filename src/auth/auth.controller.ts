import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateAppleUserDto,
  CreateGoogleUserDto,
  CreateUserDto,
} from 'src/dtos/create-user.dto';

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
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ summary: 'Sign up' })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) user: CreateUserDto,
  ): Promise<Partial<User>> {
    try {
      return this.authService.signUp(user);
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ summary: 'Google Sign In' })
  @HttpCode(HttpStatus.OK)
  @Post('google-signin')
  async googleSignIn(
    @Body() user: CreateGoogleUserDto | { googleId: string },
  ): Promise<Partial<User>> {
    try {
      return this.authService.googleSignIn(user);
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ summary: 'Apple Sign In' })
  @HttpCode(HttpStatus.OK)
  @Post('google-signin')
  async appleSignIn(
    @Body() user: CreateAppleUserDto | { appleId: string },
  ): Promise<Partial<User>> {
    try {
      return this.authService.appleLogin(user);
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
