import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { CircuitModule } from './circuit/circuit.module';
import { RaceModule } from './race/race.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserService } from './user/user.service';

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
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/api/v1/auth/*', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
