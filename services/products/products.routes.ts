import { Router } from 'express';
import ProductsController from './products.controller';
import ProductsValidation from './products.validation';

const ProductsRouter = Router();

ProductsRouter.route('/search/:queryPhrase').get(
  ProductsValidation.search,
  ProductsController.search,
);

export default ProductsRouter;
