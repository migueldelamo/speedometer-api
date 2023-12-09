import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';

@Module({
  providers: [RaceService],
  controllers: [RaceController]
})
export class RaceModule {}
