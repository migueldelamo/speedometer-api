import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Circuit, Prisma } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class CircuitService {
  constructor() {}

  async getAllCircuits(): Promise<Circuit[]> {
    return prisma.circuit.findMany({ orderBy: { name: 'asc' } });
  }

  async getById(id: number): Promise<Circuit | null> {
    return prisma.circuit.findUnique({ where: { id } });
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
      throw new HttpException('Circuit not found', HttpStatus.NOT_FOUND);
    }

    return prisma.circuit.update({
      where: { id },
      data: circuitData,
    });
  }
}
