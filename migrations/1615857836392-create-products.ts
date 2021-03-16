import Database from '../config/database';
import Products from '../services/products/products.model';
import firstProducts from '../utils/first-products';

export async function up(): Promise<void> {
  try {
    await new Database().connect();

    const productsToInsert = firstProducts.map((e) => ({ ...e, createdAt: new Date() }));
    await Products.insertMany(productsToInsert);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function down(): Promise<void> {
  try {
    await new Database().connect();
    await Products.deleteMany({});
  } catch (e) {
    console.error(e);
    throw e;
  }
}
