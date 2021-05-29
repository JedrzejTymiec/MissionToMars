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

    @Get("/100")
    find100(): Promise<Photo[]> {
        return this.photosService.findfirst100();
    }

    @Get("/")
    findAll(): Promise<Photo[]> {
        return this.photosService.findAll();
    }

    @Get("/ascending")
    findAllAscending(): Promise<Photo[]> {
        return this.photosService.findAllAscending();
    }

    @Get("/descending")
    findAllDescending(): Promise<Photo[]> {
        return this.photosService.findAllDescending();
    }

    @Get("/:rover")
    findAllByRover(@Param("rover") rover): Promise<Photo[]> {
        return this.photosService.findAllByRover(rover);
    }

    @Get("/100/:rover/:sol")
    find100ByRover(@Param("rover") rover, @Param("sol") sol): Promise<Photo[]> {
        return this.photosService.find100ByRover(rover, sol);
    }

    @Get("/camera/:c1/:c2?/:c3?/:c4?/:c5?/:c6?/:c7?/:c8?/:c9?")
    findAllByCam(
        @Param("c1") c1,
        @Param("c2") c2?,
        @Param("c3") c3?,
        @Param("c4") c4?,
        @Param("c5") c5?,
        @Param("c6") c6?,
        @Param("c7") c7?,
        @Param("c8") c8?,
        @Param("c9") c9?
    ): Promise<Photo[]> {
        return this.photosService.findAllByCam(c1, c2, c3, c4, c5, c6, c7, c8, c9)
    }
}
