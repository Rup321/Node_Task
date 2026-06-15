import Response from '../../utils/response.js';
import * as sellerService from '../services/seller.js';

export const getAllSellers = async (req, res) => {
  const result = await sellerService.getAllSellers(req.query);
  Response.ok(res, result);
};

export const deleteSeller = async (req, res) => {
  const result = await sellerService.deleteSellerAccount({
    ...req.params,
    ...req.userData,
    userId: req.userData.id,
  });
  Response.ok(res, result);
};
