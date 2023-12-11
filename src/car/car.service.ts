import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class CarService {
  constructor() {}

  async getCars(filters?: Prisma.CarWhereInput): Promise<any> {
    return prisma.car.findMany({
      where: filters,
    });
  }
}
