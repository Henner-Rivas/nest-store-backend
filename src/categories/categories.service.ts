import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private CategoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.CategoryRepo.find();
  }
  async findOne(id: number) {
    const category = await this.CategoryRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.CategoryRepo.create(data);
    return this.CategoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.CategoryRepo.merge(category, changes);
    return this.CategoryRepo.save(category);
  }

  remove(id: number) {
    return this.CategoryRepo.delete(id);
  }
}
