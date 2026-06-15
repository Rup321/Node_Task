import Response from '../../utils/response.js';
import * as productService from '../services/product.js';

export const createProduct = async (req, res) => {
  const result = await productService.createProduct({ ...req.body, userId: req.userData.id });
  Response.created(res, result);
};

export const getAllProducts = async (req, res) => {
  const result = await productService.getProducts(req.query);
  Response.ok(res, result);
};

export const deleteProduct = async (req, res) => {
  const result = await productService.deleteProduct({
    ...req.params,
    ...req.userData,
    userId: req.userData.id,
  });
  Response.ok(res, result);
};

export const downloadProductPdf = async (req, res) => {
  const result = await productService.generatePdfBufferFromProducts(req.params);

  // Set Headers to tell the browser this is a file download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Product_Specification_Sheet.pdf"');
  res.setHeader('Content-Length', result.length);

  // Send the buffer directly to the client
  res.status(200).end(result);
};
