import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { CircuitModule } from './circuit/circuit.module';
import { RaceModule } from './race/race.module';
import { JwtStrategy } from './auth/jwt.stategy';
import { GoogleStrategy } from './auth/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GoogleOAuthGuard } from './auth/google-oauth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true }),
    AuthModule,
    UserModule,
    CarModule,
    CircuitModule,
    RaceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    GoogleStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: GoogleOAuthGuard,
    // },
  ],
})
export class AppModule {}
