import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RaceService } from './race.service';
import { CreateRaceDto } from 'src/dtos/create-race.dto';
import { Race, User, UserRace } from '@prisma/client';
import { UpdateRaceDto } from 'src/dtos/update-race.dto';

@Controller('races')
@ApiTags('Races')
@UseGuards()
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @ApiOperation({ summary: 'Get all races' })
  @Get()
  getAllRaces(): Promise<Race[]> {
    return this.raceService.getAllRaces();
  }

  @ApiOperation({ summary: 'Get race by id' })
  @Get(':id')
  getRaceById(@Param('id') id: string): Promise<Race> {
    return this.raceService.getRaceById(Number(id));
  }
  @ApiOperation({ summary: 'Create race' })
  @Post()
  createRace(
    @Body(new ValidationPipe()) raceData: CreateRaceDto,
  ): Promise<Race> {
    return this.raceService.createRace(raceData);
  }

  @ApiOperation({ summary: 'Update race' })
  @Put(':id')
  updateRace(
    @Param('id') id: number,
    @Body(new ValidationPipe()) raceData: UpdateRaceDto,
  ): Promise<Race> {
    return this.raceService.updateRace(id, raceData);
  }

  @ApiOperation({ summary: 'Add users to race' })
  @Put(':id/add-users')
  addUsers(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: { userIds: number[] },
  ): Promise<{ users: Partial<User>[]; race: Race }> {
    return this.raceService.addUsersToRace(Number(id), body.userIds);
  }
}
