import { Injectable } from '@nestjs/common';
import { JsonToMapperDto } from './dto/create-json-mapper.dto';
import { ImplJsonMapper } from './helpers/json-mapper.helper';

@Injectable()
export class JsonMapperService {
  constructor(private readonly jsonMapper: ImplJsonMapper) {}

  getMapperStruct(data: JsonToMapperDto) {
    return this.jsonMapper.mapJson(data);
  }
}
