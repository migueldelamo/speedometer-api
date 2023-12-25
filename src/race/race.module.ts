import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [RaceService, UserService],
  controllers: [RaceController],
})
export class RaceModule {}
