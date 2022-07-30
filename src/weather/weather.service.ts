import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
    constructor(private readonly httpService: HttpService) {

    }

    getWeatherFromDailyWeather(lat: number, long: number) {
        return this.httpService.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=b177b2ca9a7aed734ccfa34e6a690f58`);
    }
}
