import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public.decortator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decortator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'crea products' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  findAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(+id, +categoryId);
  }

  @Patch(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(+id, categoryId);
  }
}
