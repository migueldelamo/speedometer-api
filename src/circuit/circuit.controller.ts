import { Controller, Get, Param, Query } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { Prisma } from '@prisma/client';

@Controller('circuits')
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Get()
  getCircuits(@Query() filters: Prisma.CircuitWhereInput) {
    return this.circuitService.getCircuits(filters);
  }
}
