import { Request, Response, NextFunction } from 'express';
import Products from './products.model';

class ProductsControllerClass {
  public search = async (req: Request, res: Response, next: NextFunction) => {
    const { queryPhrase } = req.params;

    const query = {
      $text: {
        $search: queryPhrase,
      },
    };

    try {
      const products = await Products.find(query, { score: { $meta: 'textScore' } }).sort({
        score: { $meta: 'textScore' },
      });

      res.json(products.map((doc) => doc.getCustomDiscount()));
    } catch (err) {
      next(err);
      console.error(err);
    }
  };
}

export const ProductsController = new ProductsControllerClass();

export default ProductsController;
