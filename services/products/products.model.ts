import { NextFunction } from 'express';
import mongoose = require('mongoose');
import { ProductDocument } from './products.interface';

const schema = new mongoose.Schema<ProductDocument>(
  {
    // Using SKU instead of sequential IDs to keep the ideal mongo structure
    sku: {
      type: Number,
      required: [true, 'SKUIsRequired'],
    },
    brand: {
      type: String,
      required: [true, 'BrandIsRequired'],
    },
    description: {
      type: String,
      required: [true, 'DescriptionIsRequired'],
    },
    image: {
      type: String,
      required: [true, 'ImageIsRequired'],
    },
    price: {
      type: Number,
      required: [true, 'PriceIsRequired'],
    },
    createdAt: {
      type: Date,
    },
  },
  { collection: 'products' },
);

async function save(next: NextFunction) {
  if (this.isNew) {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  next();
}

schema.pre<ProductDocument>('save', save);

schema.index({ brand: 'text', description: 'text' });

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  transform(doc: ProductDocument, ret: ProductDocument) {
    const r = ret;
    delete r._id;
    delete r.__v;

    return r;
  },
});

// eslint-disable-next-line func-names
schema.methods.getCustomDiscount = function (this: ProductDocument) {
  const repeatedCharsRegex = /([a-zA-Z]).*(\1)/gim;
  const product = this.toJSON();

  // Transform Juego Read Dead Redemption II
  // to: addddeeeeegiiijmnooprrtu
  // and count repeated chars

  const matches = product.description
    .toLowerCase()
    .trim()
    .split('')
    .sort()
    .join('')
    .match(repeatedCharsRegex);

  let discount = (matches || []).length / 10;

  // Limit to 0.5
  if (discount > 0.5) discount = 0.5;

  const priceWithDiscount = discount ? product.price * discount : product.price;

  return {
    ...product,
    discount,
    priceWithDiscount,
  };
};

export const Products = mongoose.model<ProductDocument>('Products', schema);

export default Products;
