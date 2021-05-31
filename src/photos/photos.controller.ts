import { Controller, Get, Param, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from '../interfaces/photo.interface';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) { }

    // @Get("/sol/:rover/:sol/:camera?")
    // getPhotosBySol(
    //     @Param("rover") rover, 
    //     @Param("sol") sol, 
    //     @Param("camera") camera?
    // ): Promise<object> {
    //     return this.photosService.getPhotosBySol(rover, sol, camera);
    // }

    // @Get("/date/:rover/:date/:camera?")
    // getPhotosByDate(
    //     @Param("rover") rover, 
    //     @Param("date") date, 
    //     @Param("camera") camera?
    // ): Promise<object> {
    //     return this.photosService.getPhotosByDate(rover, date, camera);
    // }

    @Post("/sol/:rover/:sol/:camera?")
    savePhotosBySol(
        @Param("rover") rover: string,
        @Param("sol") sol: string,
        @Param("camera") camera?: string,
    ): Promise<void> {
        return this.photosService.savePhotosBySol(rover, sol, camera);
    }

    @Post("/date/:rover/:date/:camera?")
    savePhotosByDate(
        @Param("rover") rover: string,
        @Param("date") date: string,
        @Param("camera") camera?: string,
    ): Promise<void> {
        return this.photosService.savePhotosByDate(rover, date, camera);
    }

    @Get("/page/:page")
    findPage(@Param("page") page: string): Promise<Photo[]> {
        return this.photosService.findPageDescending(page);
    }

    @Get("/page/a/:page")
    findPageAsc(@Param("page") page: string): Promise<Photo[]> {
        return this.photosService.findPageAscending(page);
    }

    @Get("/100/:rover/:sol")
    find100ByRover(@Param("rover") rover: string, @Param("sol") sol: string): Promise<Photo[]> {
        return this.photosService.find100ByRover(rover, sol);
    }

    @Get("/camera/a/:page/:c1/:c2?/:c3?/:c4?/:c5?/:c6?/:c7?/:c8?/:c9?")
    findPageByCamAsc(
        @Param("page") page: string,
        @Param("c1") c1: string,
        @Param("c2") c2?: string,
        @Param("c3") c3?: string,
        @Param("c4") c4?: string,
        @Param("c5") c5?: string,
        @Param("c6") c6?: string,
        @Param("c7") c7?: string,
        @Param("c8") c8?: string,
        @Param("c9") c9?: string
    ): Promise<Photo[]> {
        return this.photosService.findPageByCamAsc(page, c1, c2, c3, c4, c5, c6, c7, c8, c9)
    }

    @Get("/camera/d/:page/:c1/:c2?/:c3?/:c4?/:c5?/:c6?/:c7?/:c8?/:c9?")
    findPageByCamDsc(
        @Param("page") page: string,
        @Param("c1") c1: string,
        @Param("c2") c2?: string,
        @Param("c3") c3?: string,
        @Param("c4") c4?: string,
        @Param("c5") c5?: string,
        @Param("c6") c6?: string,
        @Param("c7") c7?: string,
        @Param("c8") c8?: string,
        @Param("c9") c9?: string
    ): Promise<Photo[]> {
        return this.photosService.findPageByCamDsc(page, c1, c2, c3, c4, c5, c6, c7, c8, c9)
    }

    @Get("/100/camera/:rover/:sol/:c1/:c2?/:c3?/:c4?/:c5?/:c6?/:c7?/:c8?/:c9?")
    findByCam(
        @Param("rover") rover: string,
        @Param("sol") sol: string,
        @Param("c1") c1: string,
        @Param("c2") c2?: string,
        @Param("c3") c3?: string,
        @Param("c4") c4?: string,
        @Param("c5") c5?: string,
        @Param("c6") c6?: string,
        @Param("c7") c7?: string,
        @Param("c8") c8?: string,
        @Param("c9") c9?: string
    ): Promise<Photo[]> {
        return this.photosService.findByRoverSolCam(rover, sol, c1, c2, c3, c4, c5, c6, c7, c8, c9)
    }

    @Get("/photo/:id")
    findById(@Param("id") id: string): Promise<Photo> {
        return this.photosService.findOneById(id);
    }
}
