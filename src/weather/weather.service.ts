import { Injectable, HttpService } from '@nestjs/common';
import { Weather } from "../interfaces/weather.interface";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel("Weather") private readonly weatherModel: Model<Weather>,
        private httpService: HttpService
    ) { }

    //weather from nasa
    async getWeather(): Promise<object> {
        const data = (await this.httpService.get("https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json").toPromise()).data
        const reversedData = data.sols.reverse();
        return reversedData;
    }

    //db population
    async saveWeather(): Promise<void> {
        const data = (await this.httpService.get("https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json").toPromise()).data
        data.sols.forEach(async sol => {
            const dataObj = {
                terrestrial_date: sol.terrestrial_date,
                sol: sol.sol,
                season: sol.season,
                min_temp: sol.min_temp,
                max_temp: sol.max_temp,
                pressure: sol.pressure,
                sunrise: sol.sunrise,
                sunset: sol.sunset,
            }
            const newData = new this.weatherModel(dataObj);
            await newData.save();
        })
    }

    async serveWeather(): Promise<Weather[]> {
        return this.weatherModel.find().sort({terrestrial_date: -1}).limit(5);
    }
}
