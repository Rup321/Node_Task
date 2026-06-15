import path from 'path';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import { globalErrorHandler } from '../utils/globalErrorHandler.js';
import { handleNotFoundRoute } from '../utils/nonFoundRoutesHandler.js';

const app = express();

// Security & Logging (Should always be first)
app.use(cors());
app.use(logger('dev'));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static File Serving (The Fix)
const publicDirectoryPath = path.join(process.cwd(), 'public');
app.use(express.static(publicDirectoryPath));

// API Routes
app.use('/api', indexRouter);

// Fallback Handlers
app.use(handleNotFoundRoute);
app.use(globalErrorHandler);

export default app;
