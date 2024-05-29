import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { FridgeItemService } from './fridge-item.service';
  import { CreateFridgeItemDto } from './create-fridge-item.dto';
  import { UpdateFridgeItemDto } from './update-fridge-item.dto';
  import { AuthGuard } from '@nestjs/passport';
  
  @UseGuards(AuthGuard())
  @Controller('fridge-items')
  export class FridgeItemController {
    constructor(private readonly fridgeItemService: FridgeItemService) {}
  
    @Post()
    create(@Body() createFridgeItemDto: CreateFridgeItemDto) {
      return this.fridgeItemService.create(createFridgeItemDto);
    }
  
    @Get()
    getAll() {
      return this.fridgeItemService.getAll();
    }
  
    @Get(':id')
    getById(@Param('id') id: string) {
      return this.fridgeItemService.getById(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFridgeItemDto: UpdateFridgeItemDto) {
      return this.fridgeItemService.update(id, updateFridgeItemDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.fridgeItemService.delete(id);
    }
  }
  