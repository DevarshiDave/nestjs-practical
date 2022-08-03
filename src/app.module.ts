import { HttpModule } from '@nestjs/axios';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherMiddleware } from './weather/weather.middleware';
import { WeatherService } from './weather/weather.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, WeatherController],
  providers: [AppService, WeatherService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WeatherMiddleware)
      .forRoutes({ path: 'weather/get-weather', method: RequestMethod.GET });
  }
}
