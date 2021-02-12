import { Router } from 'express';
import bodyParser from 'body-parser';
import { info } from './routes/info';
import { cache } from './routes/cache';
import { grants } from './routes/grants';

export const api = Router();
api.use(bodyParser.json());
api.use('/info', info);
api.use('/cache', cache);
api.use('/grants', grants);
