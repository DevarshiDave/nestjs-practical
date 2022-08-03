import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  /**
   *  This method consumes a third party API (https://api.openweathermap.org) which provides weather details for given latitude, longitude and date.
   *
   * @param {lat} number
   * @param {long} number
   * @param {date} string
   * @param {res} Response
   *
   */
  @Get('get-weather')
  getWeather(
    @Query('lat') lat: string,
    @Query('long') long: string,
    @Query('date') date: string,
    @Res() res: Response,
  ) {
    this.weatherService
      .getWeatherFromDailyWeather(+lat, +long)
      .subscribe((result) => {
        const dailyData = result.data.daily;
        const requestedDate = new Date(date);
        let outputObj;
        for (let i = 0; i < dailyData.length; i++) {
          const dailyDate = new Date(dailyData[i].dt * 1000);
          if (
            requestedDate.getDate() == dailyDate.getDate() &&
            requestedDate.getMonth() == dailyDate.getMonth() &&
            requestedDate.getFullYear() == dailyDate.getFullYear()
          ) {
            outputObj = dailyData[i];
            break;
          }
        }
        res.status(HttpStatus.OK).json({
          message: outputObj.weather[0]?.description,
          type: 'success',
        });
      });
  }
}
