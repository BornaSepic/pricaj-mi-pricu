import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationCodesController } from './registration-codes.controller';
import { RegistrationCodesService } from './registration-codes.service';

describe('RegistrationCodesController', () => {
  let controller: RegistrationCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationCodesController],
      providers: [RegistrationCodesService],
    }).compile();

    controller = module.get<RegistrationCodesController>(RegistrationCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
