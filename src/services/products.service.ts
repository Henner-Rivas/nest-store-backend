import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private conuterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 Description',
      price: 10,
      image: 'https://image.com/image.jpg',
      stock: 5,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.conuterId = this.conuterId + 1;
    let newProduct = this.products.push({
      id: this.conuterId,
      ...payload,
    });
    return { newProduct };
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) {
      return 'Product not found';
    }

    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = { ...product, ...payload };
    return this.products;
  }
  delete(id: number) {
    return (this.products = this.products.filter((p) => p.id !== id));
  }
}
