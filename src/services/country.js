import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';
import models from '../models/index.js';

export async function createCountry({ name }) {
  const country = await dbOperations.findOne({
    model: models.country,
    condition: {
      name,
    },
  });

  if (country) {
    return commonFunctions.handleSuccess('Country Already Exists', country);
  }

  const result = await dbOperations.create({
    model: models.country,
    body: {
      name,
    },
  });

  return commonFunctions.handleSuccess('Country Created Successfully', result);
}

export async function getAllCountries() {
  const result = await dbOperations.findAll({
    model: models.country,
    condition: {
      deleted_at: null,
    },
  });

  return commonFunctions.handleSuccess('Countries Fetched Successfully', result);
}
