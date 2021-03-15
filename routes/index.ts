import { Router } from 'express';
import ProductsRouter from '../services/products/products.routes';

const router = Router();

router.use('/products', ProductsRouter);

export default router;
