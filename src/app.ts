import express from 'express';
import { api } from './api';
export const app = express();

app.use('/api', api);
