import { IsOptional, IsString } from 'class-validator';

export class UpdateFridgeItemDto {
  @IsOptional()
  @IsString()
  name?: string;
}
