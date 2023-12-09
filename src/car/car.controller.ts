import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('car')
@ApiTags('Cars')
export class CarController {}
