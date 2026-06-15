import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as productValidation from '../validations/product.js';
import * as productController from '../controllers/product.js';
import { validate } from '../middlewares/validator.js';
import { user_roles } from '../../utils/enums.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';

const router = Router();

router.post(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(productValidation.createProductSchema),
  errorWrapper(productController.createProduct),
);
router.get(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(productValidation.getAllProductsQuerySchema),
  errorWrapper(productController.getAllProducts),
);

router.get(
  '/:productId',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(productValidation.getProductByIdSchema, 'params'),
  errorWrapper(productController.downloadProductPdf),
);

router.delete(
  '/:productId',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(productValidation.getProductByIdSchema, 'params'),
  errorWrapper(productController.deleteProduct),
);

export default router;
