import { Controller, Get, Param, Query } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('circuits')
@ApiTags('Circuits')
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Get()
  getCircuits(@Query() filters: Prisma.CircuitWhereInput) {
    console.log('filters', filters);
    return this.circuitService.getCircuits(filters);
  }
}
