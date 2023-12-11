import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from 'src/auth/google-oauth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('circuits')
@ApiTags('Circuits')
@UseGuards(JwtAuthGuard)
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Get()
  getCircuits(@Query() filters: Prisma.CircuitWhereInput) {
    return this.circuitService.getCircuits(filters);
  }
}
