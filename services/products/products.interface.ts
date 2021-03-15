import { Document } from 'mongoose';

export interface Product {
  sku: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  createdAt: Date;
}

export interface ProductDocument extends Product, Document {
  // generated in getCustomDiscount
  discount: number;
  priceWithDiscount: number;

  getCustomDiscount(this: ProductDocument): ProductDocument;
}
