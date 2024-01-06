import { Module } from '@nestjs/common';
import { JsonMapperService } from './json-mapper.service';
import { JsonMapperController } from './json-mapper.controller';
import { ImplJsonMapper } from './helpers/json-mapper.helper';

@Module({
  controllers: [JsonMapperController],
  providers: [JsonMapperService, ImplJsonMapper],
})
export class JsonMapperModule {}
