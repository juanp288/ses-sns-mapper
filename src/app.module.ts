import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonMapperModule } from './json-mapper/json-mapper.module';

@Module({
  imports: [JsonMapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
