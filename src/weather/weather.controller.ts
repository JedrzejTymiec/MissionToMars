import { Controller, Get, Post } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { Weather } from "../interfaces/weather.interface";

@Controller("weather")
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    //weather from nasa
    // @Get()
    // getWeather(): Promise<object> {
    //     return this.weatherService.getWeather();
    // }
    //db population
    @Post()
    saveWeather(): Promise<void> {
        return this.weatherService.saveWeather();
    }

    //serve data
    @Get()
    getWeather(): Promise<Weather[]> {
        return this.weatherService.serveWeather();
    }
}