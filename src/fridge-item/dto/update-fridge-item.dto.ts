import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateFridgeItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;
}
