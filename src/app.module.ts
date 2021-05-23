import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ApodModule } from "./apod/apod.module"
import config from "./config/Keys";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    ApodModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
