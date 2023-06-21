import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './migrations/seeds/database.seeder';



@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CategoriesSeeder,
    ProductsSeeder
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}