import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private CustomerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.CustomerRepo.find();
  }
  async findOne(id: number) {
    const Customer = await this.CustomerRepo.findOne({ id });
    if (!Customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return Customer;
  }

  async create(data) {
    const newCustomer = this.CustomerRepo.create(data);
    return this.CustomerRepo.save(newCustomer);
  }

  async update(id: number, changes) {
    const Customer = await this.findOne(id);
    this.CustomerRepo.merge(Customer, changes);
    return this.CustomerRepo.save(Customer);
  }

  remove(id: number) {
    return this.CustomerRepo.delete(id);
  }
}
