import { IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateFridgeItemDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsDateString()
  createDate: string;

  @IsNotEmpty()
  @IsInt()
  daysCountExpire: number;
}
