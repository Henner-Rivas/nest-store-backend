import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Order } from './entities/order.entity';
import { ProductsService } from 'src/products/products.service';
import { ConfigService } from '@nestjs/config/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private producRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    const product = this.userRepo.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateUserDto) {
    const newProduct = this.userRepo.create(data);
    return this.userRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateUserDto) {
    const product = await this.findOne(id);
    this.userRepo.merge(product, changes);
    return this.userRepo.save(product);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = await this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.producRepo.find(),
    };
  }
}
