import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ApodModule } from "./apod/apod.module"
import { WeatherModule } from "./weather/weather.module"
import { ManifestService } from './manifest/manifest.service';
import { ManifestController } from './manifest/manifest.controller';
import { ManifestModule } from './manifest/manifest.module';
import config from "./config/Keys";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    ApodModule,
    WeatherModule,
    ManifestModule
  ],
  controllers: [AppController, ManifestController],
  providers: [AppService, ManifestService],
})
export class AppModule {}
