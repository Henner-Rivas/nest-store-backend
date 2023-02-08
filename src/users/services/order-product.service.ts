import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import {
  CreateOrderProductDto,
  UpdateOrderProductDto,
} from '../dto/order-product.dto';
import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct) private itemRepo: Repository<OrderProduct>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderProductDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const item = new OrderProduct();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.itemRepo.save(item);
  }

  findAll() {
    return this.itemRepo.find({
      relations: ['order', 'order.customer', 'product'],
    });
  }

  findOne(id: number) {
    return this.itemRepo.findOne(id, {
      relations: ['order', 'product'],
    });
  }

  async update(id: number, changes: UpdateOrderProductDto) {
    const orderItem = await this.itemRepo.findOne(id);
    if (changes.orderId) {
      const order = await this.orderRepo.findOne(changes.orderId);
      orderItem.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne(changes.productId);
      orderItem.product = product;
    }
    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    return this.itemRepo.save(orderItem);
  }

  delete(id: number) {
    return this.itemRepo.delete(id);
  }
}
