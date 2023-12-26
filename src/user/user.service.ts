// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor() {}

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users.map((user) => {
      const { password, googleId, appleId, ...outputUser } = user;
      return outputUser;
    });
  }

  async findByEmail(email: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const { password, googleId, appleId, ...outputUser } = user;
      return outputUser;
    }
    return null;
  }

  async findById(id: number): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    const { password, googleId, appleId, ...outputUser } = user;
    return outputUser;
  }

  async findByGoogleId(googleId: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({ where: { googleId } });
    const { password, appleId, ...outputUser } = user;
    return outputUser;
  }

  async findByAppleId(appleId: string): Promise<Partial<User> | null> {
    const user = await prisma.user.findUnique({ where: { appleId } });
    const { password, googleId, ...outputUser } = user;
    return outputUser;
  }

  async createUser(userData: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data: userData });
    console.log({ user });
    const { password, appleId, googleId, ...outputUser } = user;
    return outputUser;
  }

  async createGoogleUser(
    sub: string,
    name: string,
    email: string,
    phone: string,
  ): Promise<Partial<User>> {
    const user = await prisma.user.create({
      data: {
        googleId: sub,
        name,
        email,
        phone,
        username: email,
        surname: '',
        password: 'google_password',
      },
    });
    const { password: userPassword, appleId, googleId, ...outputUser } = user;
    return outputUser;
  }

  async createAppleUser(
    appleId: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
  ): Promise<Partial<User>> {
    const user = await prisma.user.create({
      data: {
        appleId: appleId,
        name,
        surname,
        email,
        phone,
        username: email,
        password: 'apple_password',
      },
    });

    const { password: userPassword, googleId, ...outputUser } = user;
    return outputUser;
  }

  async updateUser(id: number, userData: Prisma.UserUpdateInput) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });

    const {
      password: userPassword,
      googleId,
      appleId,
      ...outputUser
    } = updatedUser;

    return outputUser;
  }

  async deleteUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return prisma.user.delete({ where: { id } });
  }
}
