import { Injectable } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class CarService {
  constructor() {}

  async getCars(filters?: Prisma.CarWhereInput): Promise<Car[]> {
    return prisma.car.findMany({
      where: filters,
    });
  }
}
