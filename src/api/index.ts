import { Router } from 'express';
import bodyParser from 'body-parser';
import { info } from './routes/info';
import { cache } from './routes/cache';

export const api = Router();
api.use(bodyParser.json());
api.use('/info', info);
api.use('/cache', cache);
