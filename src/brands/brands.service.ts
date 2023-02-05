import { UpdateBrandDto, CreateBrandDto } from './dto/brand.dto';

import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private BrandRepo: Repository<Brand>) {}

  findAll() {
    return this.BrandRepo.find({ relations: ['products'] });
  }
  async findOne(id: number) {
    const Brand = await this.BrandRepo.findOne(
      { id },
      { relations: ['products'] },
    );
    if (!Brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return Brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.BrandRepo.create(data);
    return this.BrandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const Brand = await this.findOne(id);
    this.BrandRepo.merge(Brand, changes);
    return this.BrandRepo.save(Brand);
  }

  remove(id: number) {
    return this.BrandRepo.delete(id);
  }
}
