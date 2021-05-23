import { Controller, Param, Get } from "@nestjs/common";
import { ApodService } from "./apod.service";
import { Observable } from 'rxjs';
import { Apod } from "../interfaces/apod.interface";

@Controller("apod")
export class ApodController {
    constructor(private readonly apodService: ApodService) {}

    @Get()
    findOne(): Promise<Observable<Promise<Apod>>> {
        return this.apodService.getTodayApod();
    }

    @Get(":date")
    findByDate(@Param("date") date): Promise<Observable<Promise<Apod>>> {
        return this.apodService.getApodByDate(date);
    }
}