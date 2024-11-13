import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(productData: CreateProductDto): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: productData.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuário com ID ${productData.userId} não encontrado`,
      );
    }
    const product = this.productRepository.create({ ...productData, user });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async updateStock(productId: string, amount: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }
    product.stock += amount;
    return this.productRepository.save(product);
  }

  async reduceStock(productId: string, amount: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }
    product.stock -= amount;
    return this.productRepository.save(product);
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const user = await this.userRepository.findOne({
      where: { id: updateProductDto.userId },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }

    Object.assign(product, { ...updateProductDto, user });
    return this.productRepository.save(product);
  }

  async delete(productId: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }

    await this.productRepository.remove(product);
  }
}
