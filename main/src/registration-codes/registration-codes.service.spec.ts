import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationCodesService } from './registration-codes.service';

describe('RegistrationCodesService', () => {
  let service: RegistrationCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationCodesService],
    }).compile();

    service = module.get<RegistrationCodesService>(RegistrationCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
