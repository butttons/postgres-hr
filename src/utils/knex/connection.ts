import knex from 'knex';

import { pgConfig } from './../pg';
export const db = knex({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: 'localhost',
        database: 'hr_test',
        password: 'postgres',
        port: 5433,
    },
});
