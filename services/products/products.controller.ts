import { Request, Response, NextFunction } from 'express';
import { isNumber } from '../../utils/helpers';
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
      if (isNumber(queryPhrase)) {
        const product = await Products.findOne({
          sku: Number(queryPhrase),
        });

        if (product) {
          return res.json([product.getCustomDiscount()]);
        }
      }

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
