import { Controller,Param,Get,Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

    @Get('')
    getPoducts(@Query() params: any) {
      let {limit,offset}= params
      return `category ${limit} ${offset}`
    }

    @Get('/:id')
    getPoduct(@Param('id') id:string) {
      return `category ${id}`
      
    }
}
