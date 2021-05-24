import { Module, HttpModule } from '@nestjs/common';
import { ManifestController } from "./manifest.controller";
import { ManifestService } from "./manifest.service";
import { ManifestSchema } from "../schemas/manifest.schema";
import { MongooseModule } from "@nestjs/mongoose"

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{name: "Manifest", schema: ManifestSchema}])
    ],
    controllers: [ManifestController],
    providers: [ManifestService]
})
export class ManifestModule {}
