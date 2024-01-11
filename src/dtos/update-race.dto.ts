import { IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateRaceDto {
  @IsOptional()
  @IsNumber({}, { message: 'Circuit ID not valid' })
  readonly circuitId: number;

  @IsOptional()
  @IsNumber({}, { message: 'User ID not valid' })
  readonly userId: number;
}
