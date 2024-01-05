import { Injectable } from '@nestjs/common';
import { Prisma, Race, User, UserRace } from '@prisma/client';
import prisma from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RaceService {
  constructor(private readonly userService: UserService) {}

  async getAllRaces(): Promise<Race[]> {
    return prisma.race.findMany();
  }

  async getRaceById(id: number): Promise<UserRace[] | null> {
    const race = await prisma.race.findUnique({
      where: { id },
    });

    const userRaces = await prisma.userRace.findMany();

    return userRaces;
  }

  async createRace(raceData: Prisma.RaceCreateInput): Promise<Race> {
    const { users, ...data } = raceData;
    const race = await prisma.race.create({
      data: data,
    });

    prisma.userRace.create({
      data: {
        userId: users[0].id,
        raceId: race.id,
      },
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

    return prisma.race.update({
      where: { id },
      data: raceData,
    });
  }

  async addUsersToRace(
    id: number,
    userIds: number[],
  ): Promise<{ race: Partial<Race>; users: Partial<User>[] } | null> {
    const existingRace = await prisma.race.findUnique({
      where: { id },
    });

    if (!existingRace) {
      return null; // Carrera no encontrada
    }

    const userPromises = userIds.map((id) => this.userService.findById(id));

    const users = await Promise.all(userPromises).then((users) =>
      users.filter(Boolean),
    );

    prisma.userRace.createMany({
      data: users.map((user) => ({
        userId: user.id,
        raceId: existingRace.id,
      })),
    });

    return { users, race: existingRace };
  }
}
