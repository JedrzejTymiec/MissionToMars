import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from "axios"

@Injectable()
export class ApodService {
    constructor(
        private httpService: HttpService
    ) {}
    
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

    async
}
