import { Injectable, HttpService } from '@nestjs/common';
import { Apod } from "../interfaces/apod.interface";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from "axios"

@Injectable()
export class ApodService {
    constructor(
        @InjectModel("Apod") private readonly apodModel: Model<Apod>,
        private httpService: HttpService
    ) {}
    
    async getTodayApod(): Promise<Observable<Promise<Apod>>> {
        return await this.httpService.get("https://api.nasa.gov/planetary/apod?date&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV")
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    async getApodByDate(date): Promise<Observable<Promise<Apod>>> {
        return await this.httpService.get(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    async
}
