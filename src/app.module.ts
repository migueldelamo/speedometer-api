import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { CircuitModule } from './circuit/circuit.module';
import { RaceModule } from './race/race.module';

@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true }), AuthModule, UserModule, CarModule, CircuitModule, RaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
