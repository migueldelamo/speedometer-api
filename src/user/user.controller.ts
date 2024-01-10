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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.userService.findById(userId);
  }
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  createUser(@Body() userData: Prisma.UserCreateInput) {
    return this.userService.createUser(userData);
  }

  @ApiOperation({ summary: 'Update user' })
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
