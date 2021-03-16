import Database from '../../config/database';
import Products from '../../services/products/products.model';
import firstProducts from '../../utils/first-products';
import { down, up } from '../1615857836392-create-products';

describe('Products search route', () => {
  const db = new Database();

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.close();
  });

  it('up', async () => {
    await up();

    const total = await Products.countDocuments();

    expect(total).toBe(firstProducts.length);
  });

  it('down', async () => {
    await down();

    const total = await Products.countDocuments();

    expect(total).toBe(0);
  });
});
