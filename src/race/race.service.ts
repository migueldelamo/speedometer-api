import { Injectable } from '@nestjs/common';
import { Prisma, Race } from '@prisma/client';
import prisma from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RaceService {
  constructor(private readonly userService: UserService) {}

  async getAllRaces(): Promise<Race[]> {
    return prisma.race.findMany();
  }

  async getRaceById(id: number): Promise<Race | null> {
    return prisma.race.findUnique({
      where: { id },
    });
  }

  async createRace(raceData: Prisma.RaceCreateInput): Promise<Race> {
    const { users, ...data } = raceData;
    const race = prisma.race.create({
      data: data,
    });

    return race;
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

    const user = await this.userService.findById(raceData.users[0]);

    return prisma.race.update({
      where: { id },
      data: raceData,
    });
  }
}
