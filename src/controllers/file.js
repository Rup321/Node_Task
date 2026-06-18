import Response from '../../utils/response.js';
import { BadRequestError } from '../../utils/customErrors.js';
import * as fileService from '../services/file.js';

export const singleFileUpload = async (req, res) => {
  if (!req.body.fileInfo) {
    throw new BadRequestError(
      'No file uploaded. Ensure the request is multipart/form-data and the field name is "file".',
    );
  }

  const result = await fileService.singleFileUpload({ ...req.body.fileInfo, userId: req.userData.id });
  Response.created(res, result);
};
