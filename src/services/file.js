import * as dbOperations from '../../utils/dbOperations.js';
import * as commonFunctions from '../../utils/commonFunctions.js';
import models from '../models/index.js';

export async function singleFileUpload({ original_name, file_name, file_path, file_url, mime_type, size, userId }) {
  const file = await dbOperations.create({
    model: models.file,
    body: {
      original_name,
      file_name,
      file_path,
      file_url,
      mime_type,
      size,
      user_id: userId,
    },
  });

  return commonFunctions.handleSuccess('File Uploaded Successfully', file);
}
