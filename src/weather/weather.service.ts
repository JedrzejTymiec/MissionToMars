import { Injectable, HttpService } from '@nestjs/common';
import { Weather } from "../interfaces/weather.interface";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { map } from 'rxjs/operators';
import { AxiosResponse } from "axios";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class WeatherService {
    constructor(
        @InjectModel("Weather") private readonly weatherModel: Model<Weather>,
        private httpService: HttpService
    ) { }

    @Cron("0 0 6 * * *")

    handleCron() {
        this.saveYesterdayWeather()
    }

    async getWeather(): Promise<object> {
        const data = (await this.httpService.get("https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json").toPromise()).data
        const reversedData = data.sols.reverse();
        return reversedData;
    }

    async saveYesterdayWeather(): Promise<void> {
        const data = (await this.httpService.get("https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json").toPromise()).data
        const newData = new this.weatherModel(data.sols[6]);
        await newData.save()
    }
}
