import { plainToClass } from 'class-transformer';
import { JsonToMapperDto } from '../dto/create-json-mapper.dto';

export function mapJson(originalJson: JsonToMapperDto) {
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
