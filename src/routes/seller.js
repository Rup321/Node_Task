import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as sellersValidation from '../validations/seller.js';
import * as sellersController from '../controllers/seller.js';
import { validate } from '../middlewares/validator.js';
import { user_roles } from '../../utils/enums.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';

const router = Router();

router.get(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(sellersValidation.getAllSellersQuerySchema),
  errorWrapper(sellersController.getAllSellers),
);

router.delete(
  '/:sellerId',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(sellersValidation.deleteSellerSchema),
  errorWrapper(sellersController.deleteSeller),
);

export default router;
