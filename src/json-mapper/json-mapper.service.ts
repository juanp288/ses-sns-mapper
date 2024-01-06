import { Injectable } from '@nestjs/common';
import { JsonToMapperDto } from './dto/create-json-mapper.dto';
import { ImplJsonMapper } from './helpers/json-mapper.helper';

@Injectable()
export class JsonMapperService {
  constructor(private readonly jsomMapper: ImplJsonMapper) {}

  getMapperStruct(data: JsonToMapperDto) {
    return this.jsomMapper.mapJson(data);
  }
}
