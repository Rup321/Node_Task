import { Router } from 'express';
import { errorWrapper } from '../../utils/commonFunctions.js';
import * as countryValidation from '../validations/country.js';
import * as countryController from '../controllers/country.js';
import { validate } from '../middlewares/validator.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { checkPermission } from '../middlewares/checkPermission.js';
import { user_roles } from '../../utils/enums.js';

const router = Router();

router.post(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [user_roles.admin] }),
  validate(countryValidation.createCountrySchema),
  errorWrapper(countryController.createCountry),
);

router.get(
  '/',
  checkAuth,
  checkPermission({ allowedRoles: [...Object.values(user_roles)] }),
  errorWrapper(countryController.getAllCountries),
);

export default router;
