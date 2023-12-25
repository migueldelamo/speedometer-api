import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RaceService } from './race.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('races')
@ApiTags('Races')
@UseGuards()
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @ApiOperation({ summary: 'Get all races' })
  @Get()
  getAllRaces(): Promise<any[]> {
    return this.raceService.getAllRaces();
  }

  @ApiOperation({ summary: 'Get race by id' })
  @Get(':id')
  getRaceById(@Param('id') id: number): Promise<any> {
    return this.raceService.getRaceById(id);
  }
  @ApiOperation({ summary: 'Create race' })
  @Post()
  createRace(@Body() raceData: any): Promise<any> {
    return this.raceService.createRace(raceData);
  }

  @ApiOperation({ summary: 'Update race' })
  @Put(':id')
  updateRace(@Param('id') id: number, @Body() raceData: any): Promise<any> {
    return this.raceService.updateRace(id, raceData);
  }
}
