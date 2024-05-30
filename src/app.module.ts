import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FridgeItemService } from './fridge-item/fridge-item.service';
import { FridgeItemModule } from './fridge-item/fridge-item.module';

@Module({
  imports: [AuthModule, FirebaseModule, FridgeItemModule],
  controllers: [AppController],
  providers: [AppService, FridgeItemService],
})
export class AppModule {}
