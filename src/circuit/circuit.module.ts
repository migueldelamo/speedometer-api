import { Module } from '@nestjs/common';
import { CircuitService } from './circuit.service';
import { CircuitController } from './circuit.controller';

@Module({
  providers: [CircuitService],
  controllers: [CircuitController]
})
export class CircuitModule {}
