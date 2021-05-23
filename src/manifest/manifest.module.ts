import { Module, HttpModule } from '@nestjs/common';
import { ManifestController } from "./manifest.controller";
import { ManifestService } from "./manifest.service";

@Module({
    imports: [
        HttpModule
    ],
    controllers: [ManifestController],
    providers: [ManifestService]
})
export class ManifestModule {}
