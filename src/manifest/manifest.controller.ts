import { Controller, Get, Param, Post } from '@nestjs/common';
import { ManifestService } from "./manifest.service"

@Controller('manifest')
export class ManifestController {
    constructor(private readonly manifestService: ManifestService) { }

    @Get(":rover")
    getSpirit(@Param("rover") rover): Promise<object> {
        return this.manifestService.getManifest(rover);
    }

    @Get()
    getAll(): Promise<object> {
        return this.manifestService.getAllManifests();
    }

    @Post()
    saveCuriosityYesterdayData(): Promise<void> {
        return this.manifestService.saveYesterdayCuriosityData();
    }

    @Post(":rover")
    saveManifestData(@Param("rover") rover): Promise<string> {
        return this.manifestService.saveManifestData(rover);
    }
}
