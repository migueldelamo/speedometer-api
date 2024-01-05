import { Injectable } from '@nestjs/common';
import { Circuit, Prisma } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class CircuitService {
  constructor() {}

  async getCircuits(
    filters?: Prisma.CircuitWhereInput & { query: string },
  ): Promise<any> {
    const output = prisma.circuit.findMany({
      where: Object.entries(filters).reduce((acc, item) => {
        const [key, value] = item;
        return key === 'query'
          ? !value
            ? acc
            : {
                OR: [
                  {
                    name: {
                      contains: value,
                    },
                  },
                  {
                    city: {
                      contains: value,
                    },
                  },
                  {
                    country: {
                      contains: value,
                    },
                  },
                ],
                ...acc,
              }
          : { [key]: value, ...acc };
      }, {}),
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
