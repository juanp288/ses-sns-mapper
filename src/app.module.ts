import { Module } from '@nestjs/common';
import { JsonMapperModule } from './json-mapper/json-mapper.module';

@Module({
  imports: [JsonMapperModule],
})
export class AppModule {}
