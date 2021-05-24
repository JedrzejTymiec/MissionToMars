import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PhotoSchema } from "../schemas/photo.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{name: "photo", schema: PhotoSchema}]),
    HttpModule
  ],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
