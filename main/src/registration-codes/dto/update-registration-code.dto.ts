import { PartialType } from '@nestjs/swagger';
import { CreateRegistrationCodeDto } from './create-registration-code.dto';
import { IsBoolean } from 'class-validator';

export class UpdateRegistrationCodeDto extends PartialType(CreateRegistrationCodeDto) {
  @IsBoolean()
  isValid: boolean;
}
