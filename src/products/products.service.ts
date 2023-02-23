import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Between, FindConditions, Repository } from 'typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  findOne(id: number) {
    const product = this.productRepo.findOne(
      { id },
      {
        relations: ['brand', 'categories'],
      },
    );
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }

    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const category = await this.categoryRepo.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    if (!product.categories.find((item) => item.id == categoryId)) {
      product.categories.push(category);
    }
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id != categoryId,
    );

    return this.productRepo.save(product);
  }
}
