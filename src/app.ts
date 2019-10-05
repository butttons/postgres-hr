import express from 'express';
import { api } from './api';

import cors from 'cors';
export const app = express();

app.use(cors('*'));
app.use('/api', api);
