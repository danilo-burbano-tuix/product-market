import { Injectable } from '@nestjs/common';
import {Product} from './product.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  async GetAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne({ id });
  }

}
