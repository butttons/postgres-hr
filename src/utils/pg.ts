import { Client } from 'pg';

export const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecom',
    password: 'postgres',
    port: 5433,
});
client.connect();
