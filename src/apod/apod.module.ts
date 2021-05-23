import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApodController } from "./apod.controller";
import { ApodService } from "./apod.service";
import { ApodSchema } from "../schemas/apod.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: "Apod", schema: ApodSchema}]),
        HttpModule
    ],
    controllers: [ApodController],
    providers: [ApodService]
})

export class ApodModule {}