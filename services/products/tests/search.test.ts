import supertest = require('supertest');
import { factory } from 'factory-girl';
import '../../../factories';
import { LeanDocument } from 'mongoose';
import app from '../../../index';
import Database from '../../../config/database';
import { ProductDocument } from '../products.interface';
import Products from '../products.model';

const request = supertest(app);

describe('Products search route', () => {
  const db = new Database();

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('Validations', () => {
    it('should return FieldIsTooShort if I send less than 4 chars', async () => {
      const response = await request.get('/products/search/Re');

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual(
        expect.objectContaining({
          code: 422,
          message: 'FieldIsTooShort',
        }),
      );
    });
  });

  describe('With products', () => {
    let productRDR: LeanDocument<ProductDocument>;
    let productMoreThan50: LeanDocument<ProductDocument>;
    let productWithoutDiscount: LeanDocument<ProductDocument>;

    beforeAll(async () => {
      productRDR = (
        await factory.create<ProductDocument>('product', {
          sku: 2,
          description: 'Juego Red Dead Redemption II',
          brand: 'Rockstar Games',
        })
      ).toJSON();

      productMoreThan50 = (
        await factory.create<ProductDocument>('product', {
          description: 'AaBbccDdEeFf',
        })
      ).toJSON();

      productWithoutDiscount = (
        await factory.create<ProductDocument>('product', {
          description: 'Abcd',
        })
      ).toJSON();
    });

    afterAll(async () => {
      await Products.deleteMany({});
    });

    it('should filter my search and show the correct discount values for sku match', async () => {
      const response = await request.get('/products/search/2');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      const responseProduct = response.body[0];
      const expectedDiscount = 0.5;

      // TODO: Fix checking date
      delete productRDR.createdAt;

      expect(responseProduct).toEqual(
        expect.objectContaining({
          ...productRDR,
          discount: expectedDiscount,
          priceWithDiscount: productRDR.price * expectedDiscount,
        }),
      );
    });

    it('should filter my search and show the correct discount values for description match', async () => {
      const response = await request.get('/products/search/red dead redemption');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      const responseProduct = response.body[0];
      const expectedDiscount = 0.5;

      // TODO: Fix checking date
      delete productRDR.createdAt;

      expect(responseProduct).toEqual(
        expect.objectContaining({
          ...productRDR,
          discount: expectedDiscount,
          priceWithDiscount: productRDR.price * expectedDiscount,
        }),
      );
    });

    it('should filter my search and show the correct discount values for brand match limiting the discount at 0.5', async () => {
      const response = await request.get('/products/search/aabbccddeeff');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      const responseProduct = response.body[0];
      const expectedDiscount = 0.5;

      // TODO: Fix checking date
      delete productMoreThan50.createdAt;

      expect(responseProduct).toEqual(
        expect.objectContaining({
          ...productMoreThan50,
          discount: expectedDiscount,
          priceWithDiscount: productMoreThan50.price * expectedDiscount,
        }),
      );
    });

    it('should filter my search and show the correct discount values for a product without discount', async () => {
      const response = await request.get('/products/search/Abcd');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);

      const responseProduct = response.body[0];
      const expectedDiscount = 0;

      // TODO: Fix checking date
      delete productWithoutDiscount.createdAt;

      expect(responseProduct).toEqual(
        expect.objectContaining({
          ...productWithoutDiscount,
          discount: expectedDiscount,
          priceWithDiscount: productWithoutDiscount.price,
        }),
      );
    });
  });

  describe('Without products', () => {
    it('should return an empty array', async () => {
      const response = await request.get('/products/search/test');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });
  });
});
