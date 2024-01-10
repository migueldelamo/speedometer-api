import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { Prisma } from '@prisma/client';

@Controller('car')
@ApiTags('Cars')
@UseGuards()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getCars(@Query() filters: Prisma.CarWhereInput) {
    return this.carService.getCars(filters);
  }
}
