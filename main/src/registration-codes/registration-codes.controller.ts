import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationCodesService } from './registration-codes.service';
import { CreateRegistrationCodeDto } from './dto/create-registration-code.dto';
import { UpdateRegistrationCodeDto } from './dto/update-registration-code.dto';

@Controller('registration-codes')
export class RegistrationCodesController {
  constructor(private readonly registrationCodesService: RegistrationCodesService) {}

  @Post()
  create(@Body() createRegistrationCodeDto: CreateRegistrationCodeDto) {
    return this.registrationCodesService.create(createRegistrationCodeDto);
  }

  @Get()
  find() {
    return this.registrationCodesService.findActive();
  }
  
  @Patch()
  updateDefault(@Body() updateRegistrationCodeDto: UpdateRegistrationCodeDto) {
    return this.registrationCodesService.updateDefault(updateRegistrationCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationCodesService.remove(+id);
  }
}
