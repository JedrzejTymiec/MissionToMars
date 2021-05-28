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

    async getManifest(rover): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .pipe(map((response: AxiosResponse) => {
                return response.data
            }))
    }

    async getAllManifests(): Promise<object> {
        return await this.manifestModel.find();
    }

    async saveYesterdayCuriosityData(): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`).toPromise()).data

        const newData = new this.manifestModel(data.photo_manifest);

        await newData.save();
    }

    async saveManifestData(rover): Promise<string> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`).toPromise()).data
        let newData = new this.manifestModel(data.photo_manifest);
        await newData.save();
        return `${rover} manifest saved`
    }
}
