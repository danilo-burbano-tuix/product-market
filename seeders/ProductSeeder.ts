import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from 'src/modules/product/product.entity';
export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await Promise.all([
      em.create(Product, {
        name: 'T-shirt',
        price: '19.99',
        size: 'M',
      }),
      em.create(Product, {
        name: 'Jeans',
        price: '49.99',
        size: 'L',
      }),
      em.create(Product, {
        name: 'Sneakers',
        price: '89.99',
        size: '42',
      }),
      em.create(Product, {
        name: 'Cap',
        price: '14.99',
        size: 'One Size',
      }),
      em.create(Product, {
        name: 'Jacket',
        price: '99.99',
        size: 'XL',
      }),
    ]);
    await em.flush();
  }
}
