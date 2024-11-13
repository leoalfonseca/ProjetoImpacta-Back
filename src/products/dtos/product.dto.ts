import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  stock: number;

  @IsUUID()
  userId: string;
}

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsInt()
  stock?: number;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class UpdateStockDto {
  @IsInt()
  amount: number;
}
