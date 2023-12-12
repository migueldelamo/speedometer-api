import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('circuits')
@ApiTags('Circuits')
@UseGuards()
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Get()
  getCircuits(@Query() filters: Prisma.CircuitWhereInput) {
    return this.circuitService.getCircuits(filters);
  }
}
