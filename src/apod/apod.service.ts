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
        @InjectModel("Apod") private readonly apodModel: Model<Apod>
    ) { }

    @Cron("0 0 6 * * *")

    handleCron() {
        this.saveTodayApod();
    }

    //Today apod from nasa
    async getTodayApod(): Promise<object> {
        return await this.httpService.get("https://api.nasa.gov/planetary/apod?date&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV")
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    //apod by date from nasa
    async getApodByDate(date): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    //everyday update func
    async saveTodayApod(): Promise<void> {
        const data = (await this.httpService.get("https://api.nasa.gov/planetary/apod?date&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV")
            .toPromise()).data
        const newData = new this.apodModel(data)
        await newData.save();
    }

    //db population 
    async saveApodByDate(date): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .toPromise()).data;
        const dataObj = {
            copyright: data.copyright,
            date: data.date,
            explanation: data.explanation,
            media_type: data.media_type,
            title: data.title,
            url: data.url
        }
        const newData = new this.apodModel(dataObj);
        await newData.save();
    }


    async lastestApod(): Promise<Apod[]> {
        return await this.apodModel.find().sort({ date: -1 }).limit(1)

    }

    async apodByDate(date): Promise<Apod[]> {
        const item = await this.apodModel.find({ date: date })
        if (item.length === 0) {
            await this.saveApodByDate(date)
            return await this.apodModel.find({ date: date })
        } else {
            return item
        }
        
    }
}
