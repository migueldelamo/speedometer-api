import { Injectable } from '@nestjs/common';
import { Prisma, Race } from '@prisma/client';
import prisma from 'prisma/prisma.service';

@Injectable()
export class RaceService {
  constructor() {}

  async getAllRaces(): Promise<Race[]> {
    return prisma.race.findMany();
  }

  async getRaceById(id: number): Promise<Race | null> {
    return prisma.race.findUnique({
      where: { id },
    });
  }

  async createRace(raceData: Prisma.RaceCreateInput): Promise<Race> {
    return prisma.race.create({
      data: raceData,
    });
  }

  async updateRace(
    id: number,
    raceData: Prisma.RaceUpdateInput,
  ): Promise<Race | null> {
    const existingRace = await prisma.race.findUnique({
      where: { id },
    });

    if (!existingRace) {
      return null; // Carrera no encontrada
    }

    return prisma.race.update({
      where: { id },
      data: raceData,
    });
  }
}
