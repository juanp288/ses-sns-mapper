import { Module } from '@nestjs/common';
import { JsonMapperService } from './json-mapper.service';
import { JsonMapperController } from './json-mapper.controller';

@Module({
  controllers: [JsonMapperController],
  providers: [JsonMapperService],
})
export class JsonMapperModule {}
