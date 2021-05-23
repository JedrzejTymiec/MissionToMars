import { Injectable, HttpService } from '@nestjs/common';
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";

@Injectable()
export class ManifestService {
    constructor(private httpService: HttpService) {}

    async getManifest(rover): Promise<object> {
        return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
        .pipe(map((response: AxiosResponse) => {
            return response.data
        }))
    }   
}
