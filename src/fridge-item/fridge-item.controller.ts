import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FridgeItemService } from './fridge-item.service';
import { CreateFridgeItemDto } from './dto/create-fridge-item.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('fridge-item')
export class FridgeItemController {
  constructor(private readonly fridgeItemService: FridgeItemService) {}

  @Post()
  create(@Body() createFridgeItemDto: CreateFridgeItemDto) {
    return this.fridgeItemService.create(createFridgeItemDto);
  }

  @Get()
  getAll(@Query('upcoming') upcoming?: boolean) {
    if (upcoming) {
      return this.fridgeItemService.getUpcomingExpiration();
    }
    return this.fridgeItemService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.fridgeItemService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.fridgeItemService.delete(id);
  }
}
