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

@Controller('products')
export class ProductsController {
  @Get('')
  getAll(@Query() params: any) {
    let { limit, offset } = params;
    return `proudct ${limit} ${offset}`;
  }
  @Get('/filter')
  getFilter(@Param('filter') filter: string) {
    return `proudct filter `;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `proudct ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'action create',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `eliminar ${id}`;
  }
}
