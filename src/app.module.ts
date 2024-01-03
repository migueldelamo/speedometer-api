import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { CircuitModule } from './circuit/circuit.module';
import { RaceModule } from './race/race.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { GoogleStrategy } from './auth/google.strategy';
import AppleStrategy from 'passport-apple';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
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
