import { Injectable } from '@nestjs/common';
import { Circuit, Prisma } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class CircuitService {
  constructor() {}

  async getAllCircuits(): Promise<any> {
    return prisma.circuit.findMany({
      select: {
        id: true,
        name: true,
        country: true,
        distance: true,
      },
    });
  }

  async getCircuitsByIds(ids: number[]): Promise<any> {
    const output = prisma.circuit.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return output;
  }
  async createCircuit(
    circuitData: Prisma.CircuitCreateInput,
  ): Promise<Circuit> {
    return prisma.circuit.create({
      data: circuitData,
    });
  }

  async updateCircuit(
    id: number,
    circuitData: Prisma.CircuitUpdateInput,
  ): Promise<Circuit | null> {
    const existingCircuit = await prisma.circuit.findUnique({
      where: { id },
    });

    if (!existingCircuit) {
      return null;
    }

    return prisma.circuit.update({
      where: { id },
      data: circuitData,
    });
  }
}
