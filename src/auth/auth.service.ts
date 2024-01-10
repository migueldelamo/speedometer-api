// auth/auth.service.ts

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import prisma from 'prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

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

  async signUp(user: User): Promise<Partial<User>> {
    const existingUser = await this.userService.findByEmail(user.email);

    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Hasheamos la contraseña antes de guardarla en la base de datos
    user.password = await this.hashPassword(user.password);

    const token = await this.signToken({
      username: user.username,
      password: user.password,
    });

    return this.userService.createUser({ ...user, token });
  }

  async signIn(email: string, password: string): Promise<Partial<User>> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const new_token = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });
    return this.userService.updateUser(user.id, {
      token: new_token,
    });
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Puedes personalizar lo que devuelves aquí según tus necesidades
    const { password, ...outputUser } = user;
    return outputUser;
  }

  async googleSignIn(user: Partial<User>): Promise<Partial<User>> {
    const { googleId, name, email } = user;

    const existingUser = await this.userService.findByGoogleId(googleId);
    if (existingUser) {
      // Si el usuario existe, iniciar sesión y actualizar el token JWT
      const new_token = await this.jwtService.signAsync({
        username: user.username,
        googleId: user.id,
      });
      const updatedUser = await this.userService.updateUser(user.id, {
        token: new_token,
      });

      return updatedUser;
    } else {
      const password = uuidv4();
      return this.userService.createUser({
        googleId,
        name,
        email,
        password,
        token: await this.jwtService.signAsync({
          email,
          password,
        }),
      });
    }
  }

  async appleLogin(user: Partial<User>): Promise<Partial<User>> {
    const { appleId, email, name, surname } = user;

    // Comprueba si el usuario ya existe en tu base de datos por su ID de Apple
    const existingUser = await this.userService.findByAppleId(appleId);

    if (existingUser) {
      // Si el usuario existe, inicia sesión y devuelve el token JWT
      const new_token = await this.jwtService.signAsync({
        username: existingUser.username,
        sub: existingUser.id,
      });
      const updatedUser = await this.userService.updateUser(existingUser.id, {
        token: new_token,
      });

      return updatedUser;
    } else {
      // Si el usuario no existe, crea un nuevo usuario en tu base de datos y devuelve el token JWT
      const password = uuidv4();
      return this.userService.createUser({
        appleId,
        email,
        password,
        name,
        surname,
        token: await this.jwtService.signAsync({
          email,
          password,
        }),
      });
    }
  }
}
