// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor() {}

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { googleId },
    });
  }

  async createUser(userData: Prisma.UserCreateInput) {
    return prisma.user.create({ data: userData });
  }

  async createGoogleUser(
    sub: string,
    name: string,
    email: string,
    phone: string,
  ): Promise<User> {
    return prisma.user.create({
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
  }

  async updateUser(id: number, userData: Prisma.UserUpdateInput) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return prisma.user.update({ where: { id }, data: userData });
  }

  async deleteUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return prisma.user.delete({ where: { id } });
  }
}
