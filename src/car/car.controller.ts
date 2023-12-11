import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('car')
@ApiTags('Cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCars(@Query() filters: Prisma.CarWhereInput) {
    return this.carService.getCars(filters);
  }
}
