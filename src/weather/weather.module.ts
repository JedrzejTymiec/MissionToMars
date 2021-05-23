import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { WeatherSchema } from "../schemas/weather.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: "Weather", schema: WeatherSchema}]),
        HttpModule
    ],
    controllers: [WeatherController],
    providers: [WeatherService]
})
export class WeatherModule {}
