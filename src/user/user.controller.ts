// user.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.findById(userId);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() userData: Prisma.UserCreateInput) {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ) {
    const userId = parseInt(id, 10);
    return this.userService.updateUser(userId, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.deleteUser(userId);
  }
}
