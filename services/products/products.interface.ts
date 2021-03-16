import { Document } from 'mongoose';

export interface Product {
  sku: number;
  brand: string;
  description: string;
  image: string;
  price: number;
}

export interface ProductDocument extends Product, Document {
  createdAt: Date;
  // generated in getCustomDiscount
  discount?: number;
  priceWithDiscount?: number;

  getCustomDiscount(this: ProductDocument): ProductDocument;
}
