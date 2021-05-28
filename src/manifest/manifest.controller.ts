import { Controller, Get, Param, Post } from '@nestjs/common';
import { ManifestService } from "./manifest.service"
import { Manifest } from "../interfaces/manifest.interface";

@Controller('manifest')
export class ManifestController {
    constructor(private readonly manifestService: ManifestService) { }
    //manifest by rover from nasa
    // @Get("/:rover")
    // getManifest(@Param("rover") rover): Promise<object> {
    //     return this.manifestService.getManifest(rover);
    // }

    // Curiosity manifest update
    @Post()
    saveCuriosityYesterdayData(): Promise<void> {
        return this.manifestService.saveYesterdayCuriosityData();
    }
    //save manifest by rover
    @Post("/:rover")
    saveManifestData(@Param("rover") rover): Promise<string> {
        return this.manifestService.saveManifestData(rover);
    }
    //serve all manifests
    @Get()
    getAll(): Promise<object> {
        return this.manifestService.getAllManifests();
    }

    @Get("/:rover")
    getByRover(@Param("rover") rover): Promise<Manifest[]> {
        return this.manifestService.getByRover(rover);
    }
}