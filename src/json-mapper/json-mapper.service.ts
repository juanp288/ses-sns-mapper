import { Injectable } from '@nestjs/common';
import { JsonToMapperDto } from './dto/create-json-mapper.dto';
import { mapJson as Mapper } from './helpers/json.mapper';

@Injectable()
export class JsonMapperService {
  private readonly mapperFunction = Mapper;

  getMapperStruct(data: JsonToMapperDto) {
    return this.mapperFunction(data);
  }
}
