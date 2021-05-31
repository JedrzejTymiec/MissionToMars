import {
    Controller,
    Param,
    Get,
    Post
} from "@nestjs/common";
import { ApodService } from "./apod.service";
import { Apod } from "../interfaces/apod.interface"

@Controller("apod")
export class ApodController {
    constructor(private readonly apodService: ApodService) { }
    // //todays apod from nasa
    //     @Get()
    //     findTodays(): Promise<object> {
    //         return this.apodService.getTodayApod();
    //     }
    // //apod by date from nasa
    //     @Get(":date")
    //     findByDate(@Param("date") date): Promise<object> {
    //         return this.apodService.getApodByDate(date);
    //     }
    //save todaty apod, cron funtion
    @Post()
    saveTodays(): Promise<void> {
        return this.apodService.saveTodayApod();
    }
    //db population function
    @Post(":date")
    saveByDate(@Param("date") date: string): Promise<void> {
        return this.apodService.saveApodByDate(date)
    }

    @Get()
    getLastestApod(): Promise<Apod[]> {
        return this.apodService.lastestApod();
    }

    @Get("/:date")
    getApodByDate(@Param("date") date: string): Promise<Apod[]> {
        return this.apodService.apodByDate(date)
    }
}