import { Injectable, HttpService } from '@nestjs/common';
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { Manifest } from "../interfaces/manifest.interface";
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class ManifestService {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel("Manifest") private readonly manifestModel: Model<Manifest>
    ) { }

    //manifest by rover from nasa
    async getManifest(rover): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    //update curiosity manifest daily
    async saveYesterdayCuriosityData(): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`).toPromise()).data

        const newData = new this.manifestModel(data.photo_manifest);

        this.manifestModel.findOneAndUpdate({ name: "Curiosity" }, newData)
    }

    //db population
    async saveManifestData(rover): Promise<string> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`).toPromise()).data
        let dataObj = {
            name: data.photo_manifest.name,
            landing_date: data.photo_manifest.landing_date,
            launch_date: data.photo_manifest.launch_date,
            status: data.photo_manifest.status,
            max_sol: data.photo_manifest.max_sol,
            max_date: data.photo_manifest.max_date,
            total_photos: data.photo_manifest.total_photos,

        }
        const newData = new this.manifestModel(dataObj)
        await newData.save();
        return `${rover} manifest saved`
    }

    //serve all manifests 
    async getAllManifests(): Promise<Manifest[]> {
        return await this.manifestModel.find();
    }

    //serve by rover
    async getByRover(rover): Promise<Manifest[]> {
        return await this.manifestModel.find({ name: rover });
    }
}
