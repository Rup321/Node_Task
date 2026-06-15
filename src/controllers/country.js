import Response from '../../utils/response.js';
import * as countryService from '../services/country.js';

export const createCountry = async (req, res) => {
  const result = await countryService.createCountry(req.body);
  Response.created(res, result);
};

export const getAllCountries = async (req, res) => {
  const result = await countryService.getAllCountries(req.query);
  Response.ok(res, result);
};
