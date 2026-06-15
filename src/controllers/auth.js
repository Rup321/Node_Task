import Response from '../../utils/response.js';
import * as authService from '../services/auth.js';

export const signUp = async (req, res) => {
  const result = await authService.signUp(req.body);
  Response.created(res, result);
};

export const signIn = async (req, res) => {
  const result = await authService.singIn(req.body);
  Response.ok(res, result);
};

export const createSellerAccount = async (req, res) => {
  const result = await authService.createSellerAccount(req.body);
  Response.created(res, result);
};

export const refreshAccessToken = async (req, res) => {
  const result = await authService.refreshAccessToken(req.body);
  Response.ok(res, result);
};
