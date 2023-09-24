import { IsString, IsUrl } from 'class-validator';

export class urlToPdfDTO {
  @IsString()
  @IsUrl({ require_protocol: true })
  url: string;

  @IsString()
  @IsUrl({})
  callbackUri: string;
}

export class dataToPdfDTO {
  @IsString()
  fileData: string;

  @IsString()
  @IsUrl({})
  callbackUri: string;
}

export class fileToPdfDTO {
  @IsString()
  @IsUrl({})
  callbackUri: string;
}
