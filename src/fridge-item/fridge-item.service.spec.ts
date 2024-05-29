import { Test, TestingModule } from '@nestjs/testing';
import { FridgeItemService } from './fridge-item.service';

describe('FridgeItemService', () => {
  let service: FridgeItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FridgeItemService],
    }).compile();

    service = module.get<FridgeItemService>(FridgeItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
