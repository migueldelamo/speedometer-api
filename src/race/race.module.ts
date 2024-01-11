import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { UserService } from 'src/user/user.service';
import { CircuitService } from 'src/circuit/circuit.service';

@Module({
  providers: [RaceService, UserService, CircuitService],
  controllers: [RaceController],
})
export class RaceModule {}
