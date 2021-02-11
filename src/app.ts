import express from 'express';
import { api } from './api';

import cors from 'cors';
import { resolve } from 'path';
export const app = express();

const uiDir = resolve(__dirname, '..', 'dist');

app.use(cors('*'));
app.use('/api', api);

app.use(express.static(uiDir));
