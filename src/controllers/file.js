import Response from '../../utils/response.js';
import * as fileService from '../services/file.js';

export const singleFileUpload = async (req, res) => {
  const result = await fileService.singleFileUpload({ ...req.body.fileInfo, userId: req.userData.id });
  Response.created(res, result);
};
