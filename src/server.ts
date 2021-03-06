#!/usr/bin/env node

require('module-alias/register');
import { createServer } from 'http';
import { app } from './app';
const server = createServer(app);

const port = +process.env.PORT || 9876;
server.listen(port, () =>
    console.log(`PostgresHR available at -- http://localhost:${port}`),
);
