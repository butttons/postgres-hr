import { Client } from 'pg';

export const pgConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'hr_test',
    password: 'postgres',
    port: 5433,
};
export const client = new Client(pgConfig);
client.connect();
