import { Controller, Get, Param } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) {}

    @Get("/sol/:rover/:sol/:camera?")
    getPhotosBySol(@Param("rover") rover, @Param("sol") sol, @Param("camera") camera?): Promise<object> {
        return this.photosService.getPhotosBySol(rover, sol, camera);
    }

    @Get("/date/:rover/:date/:camera?")
    getPhotosByDate(@Param("rover") rover, @Param("date") date, @Param("camera") camera?): Promise<object> {
        return this.photosService.getPhotosByDate(rover, date, camera);
    }
}
