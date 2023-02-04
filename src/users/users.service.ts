import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Order } from './entities/order.entity';
import { ProductsService } from 'src/products/products.service';
import { ConfigService } from '@nestjs/config/dist';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private ConfigService: ConfigService,
    @Inject('PG') private clientePg: Client,
  ) {}
  private counterId = 1;
  private users = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    const api_ky = this.ConfigService.get('API_KEY');
    console.log(
      '🚀 ~ file: users.service.ts:27 ~ UsersService ~ findAll ~ api_ky',
      api_ky,
    );

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientePg.query('SELECT * FROM tasks', (err, result) => {
        if (err) reject(err);
        resolve(result.rows);
      });
    });
  }
}
