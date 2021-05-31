import { Injectable, HttpService, BadRequestException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Photo } from "../interfaces/photo.interface";
import { Cron } from "@nestjs/schedule"

@Injectable()
export class PhotosService {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel("photo") private readonly photoModel: Model<Photo>
    ) { }

    @Cron("0 0 6 * * *")

    handleCron() {
        const date = new Date;
        const dateString = date.toISOString().slice(0, 10).split("")
        dateString[9] = (parseInt(dateString[9]) - 2).toString()
        const searchDate = dateString.join("")
        this.savePhotosByDate("Curiosity", searchDate);
    }

    //passing data from nasa API without saving

    // async getPhotosBySol(rover: string, sol: string, camera?: string): Promise<object> {
    //     return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover }/photos?sol=${ sol }${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
    //     .pipe(map((response: AxiosResponse) => {
    //         return response.data
    //     }))
    // }

    // async getPhotosByDate(rover: string, date: string, camera?: string): Promise<object> {
    //     return await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover }/photos?earth_date=${ date }${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
    //     .pipe(map((response: AxiosResponse) => {
    //         return response.data
    //     }))
    // }

    //populate db function

    async savePhotosBySol(rover: string, sol: string, camera?: string): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .toPromise()).data;
        data.photos.forEach(async element => {
            const dataObj = {
                sol: element.sol,
                camera: element.camera.name,
                img_src: element.img_src,
                earth_date: element.earth_date,
                rover: element.rover.name
            }
            const newData = new this.photoModel(dataObj);
            await newData.save();
        })
    }

    //daily curiosity photo save functinon

    async savePhotosByDate(rover: string, date: string, camera?: string): Promise<void> {
        const data = (await this.httpService.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}${camera && "&camera=" + camera}&api_key=C4v75pvxgp5viFWYLoNJfX3zssTNByDByVn8LbtV`)
            .toPromise()).data;
        data.photos.forEach(async element => {
            const dataObj = {
                sol: element.sol,
                camera: element.camera.name,
                img_src: element.img_src,
                earth_date: element.earth_date,
                rover: element.rover.name
            }
            const newData = new this.photoModel(dataObj);
            await newData.save();
        })
    }

    async findPageDescending(page): Promise<Photo[]> {
        return await this.photoModel.find().skip(page * 1000).limit(100).sort({ earth_date: -1 })

    }

    async findPageAscending(page): Promise<Photo[]> {
        return await this.photoModel.find().skip(page * 1000).limit(100).sort({ earth_date: 1 })

    }

    async find100ByRover(rover, sol): Promise<Photo[]> {
        const photos = await this.photoModel.find({ rover: rover, sol: sol }).limit(100)
        if (photos.length === 0) {
            await this.savePhotosBySol(rover, sol)
            return await this.photoModel.find({ rover: rover, sol: sol }).limit(100)
        } else {
            return photos
        }
    }

    async findPageByCamAsc(page, c1, c2?, c3?, c4?, c5?, c6?, c7?, c8?, c9?): Promise<Photo[]> {
        const data = await this.photoModel.find({ camera: { $in: [c1, c2, c3, c4, c5, c6, c7, c8, c9] } }).skip(page * 100).limit(100).sort({ earth_date: 1 })
        if (data.length === 0) {
            throw new BadRequestException("Invalid camera, photos not found")
        }
        return data
    }

    async findPageByCamDsc(page, c1, c2?, c3?, c4?, c5?, c6?, c7?, c8?, c9?): Promise<Photo[]> {
        const data = await this.photoModel.find({ camera: { $in: [c1, c2, c3, c4, c5, c6, c7, c8, c9] } }).skip(page * 100).limit(100).sort({ earth_date: -1 })
        if (data.length === 0) {
            throw new BadRequestException("Invalid camera, photos not found")
        }
        return data
    }

    async findByRoverSolCam(rover, sol, c1, c2?, c3?, c4?, c5?, c6?, c7?, c8?, c9?): Promise<Photo[]> {
        const res = await this.photoModel.find({ rover: rover, sol: sol, camera: { $in: [c1, c2, c3, c4, c5, c6, c7, c8, c9] } }).limit(100)
        if (res.length === 0) {
            if (sol >= 0 && sol <= 5111) {
                if (rover === "Spirit" || rover === "Opportunity" || rover === "Curiosity") {
                    throw new BadRequestException("Invalid camera")
                } else {
                    throw new BadRequestException("Invalid rover name")
                }
            } else {
                throw new BadRequestException("Invalid sol number")
            }
        }
        return res
    }

    async findOneById(id): Promise<Photo> {
        return await this.photoModel.findById(id)
    }
}
