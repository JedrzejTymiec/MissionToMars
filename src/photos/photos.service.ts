import { Injectable, HttpService } from '@nestjs/common';
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose";
import { Photo } from "../interfaces/photo.interface"

@Injectable()
export class PhotosService {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel("photo") private readonly photoModel: Model<Photo>
    ) {}

    async getPhotosBySol(rover, sol, camera?): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover }/photos?sol=${ sol }${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
        .pipe(map((response: AxiosResponse) => {
            return response.data
        }))
    }

    async getPhotosByDate(rover, date, camera?): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover }/photos?earth_date=${ date }${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
        .pipe(map((response: AxiosResponse) => {
            return response.data
        }))
    }

    async savePhotosBySol(rover, sol, camera?): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover }/photos?sol=${ sol }${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
        .toPromise()).data;
        data.photos.forEach(async element => {
            const newData = new this.photoModel(element);
            await newData.save();
        })
    }

    async savePhotosByDate(rover, date, camera?): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover }/photos?earth_date=${ date }${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
        .toPromise()).data;
        data.photos.forEach(async element => {
            const newData = new this.photoModel(element);
            await newData.save();
        })
    }
}
