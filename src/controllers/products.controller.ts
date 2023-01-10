import {
  Controller,
  Param,
  Get,
  Query,
  Delete,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';
import { Product } from 'src/entities/product.entity';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('')
  getAll(@Query() params: any) {
    let { limit, offset } = params;
    /*     return `proudct ${limit} ${offset}`;
     */
    return this.productsService.findAll();
  }
  @Get('/filter')
  getFilter(@Param('filter') filter: string) {
    return `proudct filter `;
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(+id, payload);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.delete(+id);
  }
}
