export class CreateProductDto {
  name: string;
  description: string;
  stock: number;
  userId: string; 
}

export class UpdateStockDto {
  amount: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  stock?: number;
}
