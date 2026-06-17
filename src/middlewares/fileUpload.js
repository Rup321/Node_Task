import multer from 'multer';
import path from 'path';
import fs from 'fs';
import response from '../../utils/response.js';
import { CONSTANT } from '../../utils/constants.js';

const folderPath = path.join('public', 'uploads');
const allowedMaxSize = CONSTANT.FILE.MAX_ALLOWED_FILE_SIZE_MB;
const allowedFileTypes = CONSTANT.FILE.ALLOWED_FILE_TYPES;

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderPath),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${extension}`);
  },
});

function checkFileType(file, cb) {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`));
  }
}

export const singleFileUploadMiddleware =
  (fieldName = 'file') =>
    (req, res, next) => {
      const upload = multer({
        storage,
        limits: { fileSize: allowedMaxSize * 1024 * 1024 },
        fileFilter: (req, file, cb) => checkFileType(file, cb),
      }).single(fieldName);

      upload(req, res, (err) => {
        if (err) {
          return response.badRequest(res, { message: err.message });
        }
        req.body = req.body || {};
        if (!req.file) {
          req.body.fileInfo = null;
          return next();
        }

        const physicalDiskPath = req.file.path;
        let staticUrlPath = physicalDiskPath.replace(/^public[\\/]?/, '').replace(/\\/g, '/');

        // Ensure leading slash for absolute pathing from domain root
        if (!staticUrlPath.startsWith('/')) {
          staticUrlPath = '/' + staticUrlPath;
        }

        // Append cleanly to req.body so downstream controllers can use it
        req.body.fileInfo = {
          original_name: req.file.originalname,
          file_name: req.file.filename,
          file_path: physicalDiskPath, // 'public/uploads/123.png'
          file_url: staticUrlPath, // '/uploads/123.png'
          mime_type: req.file.mimetype,
          size: req.file.size,
        };

        return next();
      });
    };
