import { Router } from 'express';
import bodyParser = require('body-parser');
import { info } from './routes/info';
import { grants } from './routes/grants';

export const api = Router();
api.use(bodyParser.json());
api.use('/info', info);
api.use('/grants', grants);
