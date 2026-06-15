import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';
import models from '../models/index.js';

export async function createState({ name, countryId }) {
  const state = await dbOperations.findOne({
    model: models.state,
    condition: {
      name,
      country_id: countryId,
    },
  });

  if (state) {
    return commonFunctions.handleSuccess('State Already Exists', state);
  }

  const result = await dbOperations.create({
    model: models.state,
    body: {
      name,
      country_id: countryId,
    },
  });

  return commonFunctions.handleSuccess('State Created Successfully', result);
}

export async function getAllStates({ countryId, name }) {
  const result = await dbOperations.findAll({
    model: models.state,
    condition: {
      ...(countryId && { country_id: countryId }),
      ...(name && { name }),
      deleted_at: null,
    },
  });

  return commonFunctions.handleSuccess('States Fetched Successfully', result);
}
