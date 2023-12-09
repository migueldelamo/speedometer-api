import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class CircuitService {
  constructor() {}

  async getCircuits(filters?: Prisma.CircuitWhereInput): Promise<any> {
    return prisma.circuit.findMany({
      where: filters,
    });
  }
}
