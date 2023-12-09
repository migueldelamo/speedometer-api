import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('race')
@ApiTags('Races')
export class RaceController {}
