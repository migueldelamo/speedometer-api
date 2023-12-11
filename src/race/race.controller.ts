import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RaceService } from './race.service';

@Controller('race')
@ApiTags('Races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get()
  getAllRaces(): Promise<any[]> {
    return this.raceService.getAllRaces();
  }

  @Get(':id')
  getRaceById(@Param('id') id: number): Promise<any> {
    return this.raceService.getRaceById(id);
  }

  @Post()
  createRace(@Body() raceData: any): Promise<any> {
    return this.raceService.createRace(raceData);
  }

  @Put(':id')
  updateRace(@Param('id') id: number, @Body() raceData: any): Promise<any> {
    return this.raceService.updateRace(id, raceData);
  }
}
