import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from './entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderProductController } from './controllers/order-product.controller';
import { OrderProductService } from './services/order-product.service';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Product, User, Customer, Order, OrderProduct]),
  ],
  controllers: [UsersController, OrdersController, OrderProductController],
  providers: [UsersService, OrdersService, OrderProductService],
})
export class UsersModule {}
