import faker = require('faker');
import { factory } from 'factory-girl';
import Products from './products.model';
import { Product, ProductDocument } from './products.interface';

factory.define('product', Products, async (buildOptions: Partial<ProductDocument> = {}) => {
  const defaults: Product = {
    sku: faker.random.number(),
    brand: faker.random.words(),
    description: faker.random.words(),
    image: faker.image.imageUrl(),
    price: faker.random.number(),
  };

  return {
    ...defaults,
    buildOptions,
  };
});
