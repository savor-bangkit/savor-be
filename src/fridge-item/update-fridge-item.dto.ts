import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class UpdateFridgeItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;
}
