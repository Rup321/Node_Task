import Response from '../../utils/response.js';
import * as stateService from '../services/state.js';

export const createState = async (req, res) => {
  const result = await stateService.createState(req.body);
  Response.created(res, result);
};

export const getAllStates = async (req, res) => {
  const result = await stateService.getAllStates(req.query);
  Response.ok(res, result);
};
