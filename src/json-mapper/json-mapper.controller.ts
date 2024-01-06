import { Controller, Post, Body } from '@nestjs/common';
import { JsonMapperService } from './json-mapper.service';
import { JsonToMapperDto } from './dto/create-json-mapper.dto';

@Controller('json-mapper')
export class JsonMapperController {
  constructor(private readonly jsonMapperService: JsonMapperService) {}

  @Post()
  findOne(@Body() jsonToMap: JsonToMapperDto) {
    return this.jsonMapperService.getMapperStruct(jsonToMap);
  }
}
