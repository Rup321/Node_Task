import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as fileController from '../controllers/file.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';
import { user_roles } from '../../utils/enums.js';
import { singleFileUploadMiddleware } from '../middlewares/fileUpload.js';

const router = Router();

router.post(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: Object.values(user_roles) }),
  singleFileUploadMiddleware(),
  errorWrapper(fileController.singleFileUpload),
);

export default router;
