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
  findAll() {
    return this.registrationCodesService.findAll();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationCodeDto: UpdateRegistrationCodeDto) {
    return this.registrationCodesService.update(+id, updateRegistrationCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationCodesService.remove(+id);
  }
}
