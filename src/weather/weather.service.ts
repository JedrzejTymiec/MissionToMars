import { Injectable, HttpService } from '@nestjs/common';
import { Weather } from "../interfaces/weather.interface";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { map } from 'rxjs/operators';
import { AxiosResponse } from "axios"

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel("Weather") private readonly weatherModel: Model<Weather>,
        private httpService: HttpService
    ) {}

    async getWeather(): Promise<object>{
        return await this.httpService.get("https://mars.nasa.gov/rs/api/?feed=weather&category=mars2020&feedtype=json")
        .pipe(map((response: AxiosResponse) => {
            return response.data.sols
        }));
    }
}
