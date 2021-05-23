import { Module, HttpModule } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
