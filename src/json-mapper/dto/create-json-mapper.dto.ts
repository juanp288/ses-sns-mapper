import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Header {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

class CommonHeaders {
  @IsEmail()
  returnPath: string;

  @IsArray()
  @IsEmail({}, { each: true })
  from: string[];

  @IsString()
  date: string;

  @IsArray()
  @IsEmail({}, { each: true })
  to: string[];

  @IsString()
  messageId: string;

  @IsString()
  subject: string;
}

class Mail {
  @IsDateString()
  timestamp: string;

  @IsEmail()
  source: string;

  @IsString()
  messageId: string;

  @IsArray()
  @IsEmail({}, { each: true })
  destination: string[];

  @IsBoolean()
  headersTruncated: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Header)
  headers: Header[];

  @ValidateNested()
  @Type(() => CommonHeaders)
  commonHeaders: CommonHeaders;
}

class Verdict {
  @IsString()
  status: string;
}

class Action {
  @IsString()
  type: string;

  @IsString()
  topicArn: string;
}

class Receipt {
  @IsDateString()
  timestamp: string;

  @IsNumber()
  processingTimeMillis: number;

  @IsArray()
  @IsEmail({}, { each: true })
  recipients: string[];

  @ValidateNested()
  @Type(() => Verdict)
  spamVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  virusVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  spfVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  dkimVerdict: Verdict;

  @ValidateNested()
  @Type(() => Verdict)
  dmarcVerdict: Verdict;

  @IsString()
  dmarcPolicy: string;

  @ValidateNested()
  @Type(() => Action)
  action: Action;
}

class SES {
  @ValidateNested()
  @Type(() => Receipt)
  receipt: Receipt;

  @ValidateNested()
  @Type(() => Mail)
  mail: Mail;
}

class Record {
  @IsString()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SES)
  ses: SES;

  @IsString()
  eventSource: string;
}

export class JsonToMapperDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Record)
  Records: Record[];
}
