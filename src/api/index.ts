import { Router } from 'express';
import bodyParser from 'body-parser';
import { info } from './routes/info';
import { grants } from './routes/grants';
import { cache } from './routes/cache';

export const api = Router();
api.use(bodyParser.json());
api.use('/info', info);
api.use('/grants', grants);
api.use('/cache', cache);
