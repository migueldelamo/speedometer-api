// auth/auth.service.ts

import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import prisma from 'prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateAppleUserDto,
  CreateGoogleUserDto,
  CreateUserDto,
} from 'src/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async signToken(payload: {
    username: string;
    password: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async signUp(user: CreateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userService.findByEmail(user.email);

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    // Hasheamos la contraseña antes de guardarla en la base de datos

    const password = await this.hashPassword(user.password);

    const token = await this.signToken({
      username: password,
      password: user.password,
    });

    return this.userService.createUser({ ...user, token, password });
  }

  async signIn(email: string, password: string): Promise<Partial<User>> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const new_token = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });
    return this.userService.updateUser(user.id, {
      token: new_token,
    });
  }

  async validateUser(payload: any): Promise<Partial<User>> {
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Puedes personalizar lo que devuelves aquí según tus necesidades
    const { password, ...outputUser } = user;
    return outputUser;
  }

  async googleSignIn(
    user: CreateGoogleUserDto | { googleId: string },
  ): Promise<Partial<User>> {
    const googleId = user.googleId;
    const existingUser = await this.userService.findByAppleId(googleId);

    if (existingUser) {
      const new_token = await this.jwtService.signAsync({
        username: existingUser.username,
        sub: existingUser.id,
      });
      const updatedUser = await this.userService.updateUser(existingUser.id, {
        token: new_token,
      });

      return updatedUser;
    } else {
      if (user instanceof CreateGoogleUserDto) {
        if (await this.userService.findByEmail(user.email)) {
          throw new HttpException('User already created.', HttpStatus.CONFLICT);
        }
        const password = uuidv4();
        const { email, name } = user;
        return this.userService.createUser({
          googleId,
          email,
          password,
          name,
          token: await this.jwtService.signAsync({
            email,
            password,
          }),
        });
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async appleLogin(
    user: CreateAppleUserDto | { appleId: string },
  ): Promise<Partial<User>> {
    const appleId = user.appleId;
    const existingUser = await this.userService.findByAppleId(appleId);

    if (existingUser) {
      const new_token = await this.jwtService.signAsync({
        username: existingUser.username,
        sub: existingUser.id,
      });
      const updatedUser = await this.userService.updateUser(existingUser.id, {
        token: new_token,
      });

      return updatedUser;
    } else {
      if (user instanceof CreateAppleUserDto) {
        if (await this.userService.findByEmail(user.email)) {
          throw new HttpException('User already created.', HttpStatus.CONFLICT);
        }
        const password = uuidv4();
        const { email, name } = user;
        return this.userService.createUser({
          appleId,
          email,
          password,
          name,
          token: await this.jwtService.signAsync({
            email,
            password,
          }),
        });
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
