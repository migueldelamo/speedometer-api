import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateRaceDto {
  @IsDate({ message: 'Date field not valid' })
  @IsNotEmpty()
  readonly date: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Circuit ID not valid' })
  readonly circuitId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'User ID not valid' })
  readonly userId: number;
}
