import { IsString, IsUrl } from '@utils/validation';

export class urlToPdfDTO {
  @IsString()
  @IsUrl({ require_protocol: true })
  url: string;
}
