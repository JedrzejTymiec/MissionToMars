import { Controller, Param, Get, Post } from "@nestjs/common";
import { ApodService } from "./apod.service";

@Controller("apod")
export class ApodController {
    constructor(private readonly apodService: ApodService) {}

    @Get()
    findTodays(): Promise<object> {
        return this.apodService.getTodayApod();
    }

    @Get(":date")
    findByDate(@Param("date") date): Promise<object> {
        return this.apodService.getApodByDate(date);
    }

    @Post()
    saveTodays(): Promise<void> {
        return this.apodService.saveTodayApod();
    }
}