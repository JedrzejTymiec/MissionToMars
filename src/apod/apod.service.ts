import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from "axios"
import { InjectModel } from "@nestjs/mongoose"
import { Apod } from "../interfaces/apod.interface"
import { Model } from 'mongoose';
import { Cron } from "@nestjs/schedule";

@Injectable()
export class ApodService {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel("Apod") private readonly apodModel:Model<Apod>
    ) {}

    @Cron("0 0 6 * * *")

    handleCron() {
        this.saveTodayApod();
    }
    
    async getTodayApod(): Promise<object> {
        return await this.httpService.get("https://api.nasa.gov/planetary/apod?date&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV")
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    async getApodByDate(date): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    async saveTodayApod(): Promise<void> {
        const data = (await this.httpService.get("https://api.nasa.gov/planetary/apod?date&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV")
        .toPromise()).data
        const newData = new this.apodModel(data)
        await newData.save();
    }
}
