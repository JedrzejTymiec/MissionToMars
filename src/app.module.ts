import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApodService } from './apod/apod.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ApodService],
})
export class AppModule {}
