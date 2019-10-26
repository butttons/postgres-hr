import { Client, ConnectionConfig } from 'pg';
import { currentConnection } from '@/utils/cache-db/utils';
export const clientFactory = () => {
    const client = new Client(currentConnection());
    client.connect();
    return client;
};
