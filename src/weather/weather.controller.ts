import { Controller, Get, Post } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller("weather")
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    getWeather(): Promise<object> {
        return this.weatherService.getWeather();
    }

    @Post()
    saveWeather(): Promise<void> {
        return this.weatherService.saveYesterdayWeather();
    }
}