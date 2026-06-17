import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as authController from '../controllers/auth.js';
import { singleFileUploadMiddleware } from '../middlewares/fileUpload.js';
import * as authValidation from '../validations/auth.js';
import { validate } from '../middlewares/validator.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';
import { user_roles } from '../../utils/enums.js';

const router = Router();

router.post(
  '/signup',
  singleFileUploadMiddleware(),
  validate(authValidation.signUpSchema),
  errorWrapper(authController.signUp),
);

router.post(
  '/account/seller',
  checkAuth,
  checkPermission({ allowedRoles: [user_roles.admin] }),
  singleFileUploadMiddleware(),
  validate(authValidation.createSellerAccountSchema),
  errorWrapper(authController.createSellerAccount),
);

router.post('/signin', validate(authValidation.signInSchema), errorWrapper(authController.signIn));
router.post('/refresh', validate(authValidation.refreshTokenSchema), errorWrapper(authController.refreshAccessToken));

export default router;
