import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from './entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Product, User, Customer]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
