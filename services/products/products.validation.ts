import { Request, Response, NextFunction } from 'express';
import HttpError from '../../config/errors';

class ProductsValidationClass {
  public search = async (req: Request, res: Response, next: NextFunction) => {
    const errors: HttpError[] = [];
    const { queryPhrase } = req.params;

    if (queryPhrase.length < 4) {
      errors.push(new HttpError('FieldIsTooShort', 422, { field: 'queryPhrase' }));
    }

    if (errors.length) next(errors);
    else next();
  };
}

export const ProductsValidation = new ProductsValidationClass();

export default ProductsValidation;
