import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFridgeItemDto {
  @IsNotEmpty()
  @IsString()
  category: string;
}
