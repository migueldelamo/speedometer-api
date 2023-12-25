import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('circuits')
@ApiTags('Circuits')
@UseGuards()
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Get()
  getCircuits(
    @Query('query') query: string,
    @Query() filters: Prisma.CircuitWhereInput,
  ) {
    return this.circuitService.getCircuits({ query, ...filters });
  }

  @ApiOperation({ summary: 'Create circuit' })
  @Post()
  createCircuit(@Body() circuitData: any): Promise<any> {
    return this.circuitService.createCircuit(circuitData);
  }
}
