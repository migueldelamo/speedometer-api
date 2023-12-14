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

  async signUp(
    user: User,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const existingUser = await this.userService.findByUsername(user.username);

    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Hasheamos la contraseña antes de guardarla en la base de datos
    user.password = await this.hashPassword(user.password);

    // Crear el nuevo usuario
    const newUser = await this.userService.createUser(user);

    // Generar y devolver el token JWT
    const token = await this.signToken({
      username: newUser.username,
      password: newUser.password,
    });
    const outputUser = {
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      phone: newUser.phone,
    };
    return { access_token: token, user: outputUser };
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const user = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const access_token = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });
    const {
      id,
      password: userPassword,
      googleId,
      appleId,
      ...outputUser
    } = user;

    return { access_token, user: outputUser };
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

  async googleLogin(
    req: any,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    // 'req.user' contendrá la información del usuario devuelta por la estrategia de Google
    const { sub, name, email, phone } = req.user;

    // Comprueba si el usuario ya existe en tu base de datos por su ID de Google (sub)
    const existingUser = await this.userService.findByGoogleId(sub);
    if (existingUser) {
      const {
        id,
        password: userPassword,
        googleId,
        appleId,
        ...result
      } = existingUser;
      // Si el usuario existe, inicia sesión y devuelve el token JWT
      const payload = {
        userId: existingUser.id,
        username: existingUser.username,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      };
    } else {
      // Si el usuario no existe, crea un nuevo usuario en tu base de datos y devuelve el token JWT
      const newUser = await this.userService.createGoogleUser(
        sub,
        name,
        email,
        phone,
      );
      const {
        id,
        password: userPassword,
        googleId,
        appleId,
        ...result
      } = newUser;
      const payload = { userId: newUser.id, username: newUser.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      };
    }
  }

  async appleLogin(
    req: any,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    const { appleId, email, name, surname, phone } = req.user;

    // Comprueba si el usuario ya existe en tu base de datos por su ID de Apple
    const existingUser = await this.userService.findByAppleId(appleId);

    if (existingUser) {
      // Si el usuario existe, inicia sesión y devuelve el token JWT
      const {
        id,
        password: userPassword,
        googleId,
        appleId,
        ...result
      } = existingUser;
      const payload = {
        userId: existingUser.id,
        username: existingUser.username,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      };
    } else {
      // Si el usuario no existe, crea un nuevo usuario en tu base de datos y devuelve el token JWT
      const newUser = await this.userService.createAppleUser(
        appleId,
        email,
        name,
        surname,
        phone,
      );
      const { id, password: userPassword, googleId, ...result } = newUser;
      const payload = { userId: newUser.id, username: newUser.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      };
    }
  }
}
