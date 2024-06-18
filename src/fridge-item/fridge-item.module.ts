import { Module } from '@nestjs/common';
import { FridgeItemController } from './fridge-item.controller';
import { FridgeItemService } from './fridge-item.service';

@Module({
  controllers: [FridgeItemController],
  providers: [FridgeItemService],
})
export class FridgeItemModule {}
