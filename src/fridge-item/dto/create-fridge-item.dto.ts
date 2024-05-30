import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateFridgeItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  daysCountExpire: number;
}
