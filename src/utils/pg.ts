import { Client } from 'pg';
import { currentConnectionConfig } from '@/utils/cache-db/utils';

const clientMap = new Map();

export const clientFactory = (): Client | null => {
    const info = currentConnectionConfig();
    if (info.id === null) return null;
    if (clientMap.has(info.id)) {
        return clientMap.get(info.id);
    } else {
        const client = new Client(info.config);
        client.connect();
        clientMap.set(info.id, client);
        return client;
    }
};
