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
import { Circuit, Prisma } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('circuits')
@ApiTags('Circuits')
@UseGuards()
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Get()
  getCircuits() {
    return this.circuitService.getAllCircuits();
  }

  @ApiOperation({ summary: 'Create circuit' })
  @Post()
  createCircuit(@Body() circuitData: any): Promise<Circuit> {
    return this.circuitService.createCircuit(circuitData);
  }
}
