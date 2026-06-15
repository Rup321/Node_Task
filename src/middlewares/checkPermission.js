import { ForbiddenError, UnauthorizedError } from '../../utils/customErrors.js';

/**
 * Validates if the authenticated user has the required role(s).
 * Usage: authorizeRoles({ allowedRoles: [user_roles.admin, user_roles.seller] })
 */
export const checkPermission = ({ allowedRoles = [] }) => {
  return (req, res, next) => {
    if (!req.userData || !req.userData.role) {
      return next(new UnauthorizedError('Authentication context missing. Please log in.'));
    }

    if (!allowedRoles.includes(req.userData.role)) {
      return next(new ForbiddenError('You do not have the required permissions to perform this action.'));
    }

    next();
  };
};
