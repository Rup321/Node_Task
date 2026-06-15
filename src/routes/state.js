import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as stateValidation from '../validations/state.js';
import * as stateController from '../controllers/state.js';
import { validate } from '../middlewares/validator.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';
import { user_roles } from '../../utils/enums.js';

const router = Router();

router.post(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [user_roles.admin] }),
  validate(stateValidation.createStateSchema),
  errorWrapper(stateController.createState),
);

router.get(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  validate(stateValidation.getAllStatesQuerySchema),
  errorWrapper(stateController.getAllStates),
);

export default router;
