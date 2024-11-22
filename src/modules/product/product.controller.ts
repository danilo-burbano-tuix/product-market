import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.GetAllProducts();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Product> {
    return this.productService.findOne(id);
  }


}
