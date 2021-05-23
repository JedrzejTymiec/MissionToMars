import { Controller, Get, Param } from '@nestjs/common';
import { ManifestService } from "./manifest.service"

@Controller('manifest')
export class ManifestController {
    constructor(private readonly manifestService: ManifestService) {} 
    
    @Get(":rover")
    getSpirit(@Param("rover") rover) {
        return this.manifestService.getManifest(rover);
    }
}
