import { Controller, Param, Get } from "@nestjs/common";
import { ApodService } from "./apod.service";

@Controller("apod")
export class ApodController {
    constructor(private readonly apodService: ApodService) {}

    @Get()
    findOne(): Promise<object> {
        return this.apodService.getTodayApod();
    }

    @Get(":date")
    findByDate(@Param("date") date): Promise<object> {
        return this.apodService.getApodByDate(date);
    }
}