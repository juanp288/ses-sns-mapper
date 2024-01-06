import { jsonMapper } from 'json-mapper';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JsonToMapperDto } from '../dto/create-json-mapper.dto';

@Injectable()
export class ImplJsonMapper {
  public mapJson(originalJson: JsonToMapperDto) {
    return this.mapJsonWithPlainToClass(originalJson);
  }

  /**
   * Currently using PlainToClass to class-transformer
   * @param originalJson
   * @returns New JSON structure require
   */
  private mapJsonWithPlainToClass(originalJson: JsonToMapperDto) {
    const records = plainToClass(JsonToMapperDto, originalJson).Records;

    return records.map((record) => {
      const { mail, receipt } = record.ses;
      return {
        spam: receipt.spamVerdict.status === 'PASS',
        virus: receipt.virusVerdict.status === 'PASS',
        dns:
          receipt.spfVerdict.status === 'PASS' &&
          receipt.dkimVerdict.status === 'PASS' &&
          receipt.dmarcVerdict.status === 'PASS',
        mes: new Date(mail.timestamp).toLocaleString('es', { month: 'long' }),
        retrasado: receipt.processingTimeMillis > 1000,
        emisor: mail.source.split('@')[0],
        receptor: mail.destination.map((dest) => dest.split('@')[0]),
      };
    });
  }

  /**
   * TODO: Validate InternalServerError. Cannot use `npm i --save-dev @types/json-mapper`
   * @param originalJson Json in Body
   * @returns
   */
  private mapJsonUsingJsonMapper(originalJson: JsonToMapperDto) {
    const mapping = {
      spam: ({ ses }) => ses.receipt.spamVerdict.status === 'PASS',
      virus: ({ ses }) => ses.receipt.virusVerdict.status === 'PASS',
      dns: ({ ses }) => {
        const { spfVerdict, dkimVerdict, dmarcVerdict } = ses.receipt;
        return (
          spfVerdict.status === 'PASS' &&
          dkimVerdict.status === 'PASS' &&
          dmarcVerdict.status === 'PASS'
        );
      },
      mes: ({ ses }) =>
        new Date(ses.mail.timestamp).toLocaleString('es', { month: 'long' }),
      retrasado: ({ ses }) => ses.receipt.processingTimeMillis > 1000,
      emisor: ({ ses }) => ses.mail.source.split('@')[0],
      receptor: ({ ses }) =>
        ses.mail.destination.map((dest) => dest.split('@')[0]),
    };

    return jsonMapper(originalJson.Records[0], mapping);
  }
}
