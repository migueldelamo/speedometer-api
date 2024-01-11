import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Race, User, UserRace } from '@prisma/client';
import prisma from 'prisma/prisma.service';
import { CircuitService } from 'src/circuit/circuit.service';
import { CreateRaceDto } from 'src/dtos/create-race.dto';
import { UpdateRaceDto } from 'src/dtos/update-race.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RaceService {
  constructor(
    private readonly userService: UserService,
    private readonly circuitService: CircuitService,
  ) {}

  async getAllRaces(): Promise<Race[]> {
    return prisma.race.findMany();
  }

  async getRaceById(id: number): Promise<Race | null> {
    const race = await prisma.race.findUnique({
      where: { id },
    });

    return race;
  }

  async createRace(raceData: CreateRaceDto): Promise<Race> {
    const circuit = await this.circuitService.getById(raceData.circuitId);
    const user = await this.userService.findById(raceData.userId);

    if (!user || !circuit) {
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }
    const race = await prisma.race.create({
      data: {
        circuitId: circuit.id,
        date: raceData.date,
      },
    });

    prisma.userRace.create({
      data: {
        userId: user.id,
        raceId: race.id,
      },
    });

    return race;
  }

  async updateRace(id: number, raceData: UpdateRaceDto): Promise<Race> {
    const existingRace = await prisma.race.findUnique({
      where: { id },
    });

    if (!existingRace) {
      throw new HttpException('Race not found', HttpStatus.NOT_FOUND);
    }

    return prisma.race.update({
      where: { id },
      data: raceData,
    });
  }

  async addUsersToRace(
    id: number,
    userIds: number[],
  ): Promise<{ race: Race; users: Partial<User>[] } | null> {
    const existingRace = await prisma.race.findUnique({
      where: { id },
    });

    if (!existingRace) {
      throw new HttpException('Race not found', HttpStatus.NOT_FOUND);
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
