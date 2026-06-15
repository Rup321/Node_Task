import { user_roles } from '../../utils/enums.js';
import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';

import models from '../models/index.js';
import { BadRequestError, UnauthorizedError } from '../../utils/customErrors.js';
import { Op } from 'sequelize';

export const getAllSellers = async ({ page, limit, search, gender }) => {
  const result = await dbOperations.findAll({
    model: models.user,
    condition: {
      deleted_at: null,
      role: user_roles.seller,
      ...(search && {
        ...{
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { mobile_number: { [Op.like]: `%${search}%` } },
          ],
        },
      }),
      ...(gender && { gender }),
    },
    attributes: {
      exclude: ['password_hash', 'refresh_token', 'created_at', 'updated_at'],
    },
    include: [
      {
        model: models.seller,
        as: 'seller',
        include: [
          {
            model: models.country,
            as: 'country',
          },
          {
            model: models.state,
            as: 'state',
          },
        ],
      },
    ],
    ...commonFunctions.getPagination({ page, limit }),
  });

  return commonFunctions.handleSuccess(
    'Seller Records Fetched Successfully',
    commonFunctions.paginatedResponse({
      page,
      limit,
      totalCount: result.count,
      responses: result.rows,
    }),
  );
};

export const getSellerById = async ({ sellerId }) => {
  const result = await dbOperations.findByPk({
    model: models.user,
    id: sellerId,
    condition: {
      deleted_at: null,
    },

    attributes: ['-password_hash'],

    include: [
      {
        model: models.seller,
        as: 'seller',
        include: [
          {
            model: models.country,
            as: 'country',
          },
          {
            model: models.state,
            as: 'state',
          },
        ],
      },
    ],
    ...commonFunctions.getPagination({ page, limit }),
  });

  return commonFunctions.handleSuccess('Seller Record Fetched Successfully', result);
};

export async function deleteSellerAccount({ sellerId, userId, role }) {
  await checkIfAllowedToDelete({ sellerId, userId, role });

  const sellerAccount = await dbOperations.findOne({
    model: models.user,
    condition: {
      id: sellerId,
      deleted_at: null,
    },
    raw: true,
  });

  if (!sellerAccount) {
    throw new BadRequestError('Seller Account Not Found');
  }

  await dbOperations.destroy({
    model: models.user,
    condition: {
      id: sellerId,
      deleted_at: null,
    },
  });

  await dbOperations.destroy({
    model: models.seller,
    condition: {
      user_id: sellerId,
      deleted_at: null,
    },
  });

  return commonFunctions.handleSuccess('Seller Account Deleted Successfully');
}

/* <---------- utils -----------> */

async function checkIfAllowedToDelete({ sellerId, userId, role }) {
  return role === user_roles.admin || sellerId === userId;
}
