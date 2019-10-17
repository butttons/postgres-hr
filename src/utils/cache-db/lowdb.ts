import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { ConnectionConfig } from 'pg';

const dbFilePath = resolve(__dirname, '..', '..', '..', 'cache-db.json');
const adapter = new FileSync(dbFilePath);
export const cacheDb = low(adapter);

export interface CacheSchema {
    clients: Record<string, ConnectionConfig>;
    currentClient: ConnectionConfig;
}

cacheDb
    .defaults({
        clients: {},
        currentClient: null,
    })
    .write();
