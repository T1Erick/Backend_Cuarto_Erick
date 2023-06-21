import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private categoriesSeeder: CategoriesSeeder,
    private productsSeeder: ProductsSeeder,
    
  ) {}

  async run() {
    await this.categoriesSeeder.run();
    
    await this.productsSeeder.run();
  }
}