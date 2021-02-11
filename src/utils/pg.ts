import { Client } from 'pg';
import { currentConnectionConfig } from '@/utils/cache-db/utils';

const clientMap = new Map();

export const clientFactory = () => {
    const info = currentConnectionConfig();
    const client = new Client(info.config);
    client.connect();
    return client;
};
