import { Controller, Get, Param, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) {}

    @Get("/sol/:rover/:sol/:camera?")
    getPhotosBySol(
        @Param("rover") rover, 
        @Param("sol") sol, 
        @Param("camera") camera?
    ): Promise<object> {
        return this.photosService.getPhotosBySol(rover, sol, camera);
    }

    @Get("/date/:rover/:date/:camera?")
    getPhotosByDate(
        @Param("rover") rover, 
        @Param("date") date, 
        @Param("camera") camera?
    ): Promise<object> {
        return this.photosService.getPhotosByDate(rover, date, camera);
    }

    @Post("/sol/:rover/:sol/:camera?")
    savePhotosBySol(
        @Param("rover") rover,
        @Param("sol") sol,
        @Param("camera") camera?,
    ): Promise<void> {
        return this.photosService.savePhotosBySol(rover, sol, camera);
    }

    @Post("/date/:rover/:date/:camera?")
    savePhotosByDate(
        @Param("rover") rover,
        @Param("date") date,
        @Param("camera") camera?,
    ): Promise<void> {
        return this.photosService.savePhotosByDate(rover, date, camera);
    }
}
