import { Injectable } from '@nestjs/common';
import { CreateRegistrationCodeDto } from './dto/create-registration-code.dto';
import { UpdateRegistrationCodeDto } from './dto/update-registration-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationCode } from './entities/registration-code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationCodesService {
  constructor(
    @InjectRepository(RegistrationCode)
    private registrationCodeRepository: Repository<RegistrationCode>,
  ) { }

  create(createRegistrationCodeDto: CreateRegistrationCodeDto) {
    return this.registrationCodeRepository.save({
      code: createRegistrationCodeDto.code,
      isValid: true,
    })
  }


  async validateCode(code: string): Promise<boolean> {
    const registrationCode = await this.registrationCodeRepository.findOne({
      where: {
        code: code,
        isValid: true
      }
    })

    if (!registrationCode) {
      return false
    }

    return registrationCode.isValid
  }

  findAll() {
    return this.registrationCodeRepository.find();
  }

  findActive() {
    return this.registrationCodeRepository.findOne({
      where: {
        isValid: true
      }
    });
  }

  update(id: number, updateRegistrationCodeDto: UpdateRegistrationCodeDto) {
    return this.registrationCodeRepository.update(id, updateRegistrationCodeDto)
  }

  async updateDefault(updateRegistrationCodeDto: UpdateRegistrationCodeDto) {
    const defaultRegistrationCode = await this.registrationCodeRepository.findOne({
      where: {
        isValid: true
      }
    })

    if (!defaultRegistrationCode) {
      const newRegistrationCode = this.registrationCodeRepository.create(updateRegistrationCodeDto)
      return this.registrationCodeRepository.save(newRegistrationCode)
    }

    return this.registrationCodeRepository.update(defaultRegistrationCode.id, updateRegistrationCodeDto)
  }

  remove(id: number) {
    return this.registrationCodeRepository.delete(id)
  }
}
