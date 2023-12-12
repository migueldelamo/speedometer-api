import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RaceService } from './race.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('race')
@ApiTags('Races')
@UseGuards()
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
