import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ApodModule } from "./apod/apod.module"
import { WeatherModule } from "./weather/weather.module"
import { ManifestModule } from './manifest/manifest.module';
import { PhotosModule } from './photos/photos.module';
import config from "./config/Keys";
import { ScheduleModule } from "@nestjs/schedule"

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    ApodModule,
    WeatherModule,
    ManifestModule,
    PhotosModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
