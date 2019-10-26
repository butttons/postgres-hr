import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { ConnectionConfig } from 'pg';

export interface CacheSchema {
    connections: Record<string, ConnectionConfig>;
    currentConnection: string;
}
const dbFilePath = resolve(__dirname, '..', '..', '..', 'cache-db.json');
const adapter = new FileSync<CacheSchema>(dbFilePath);
export const cacheDb = low(adapter);

cacheDb
    .defaults({
        connections: {},
        currentConnection: null,
    })
    .write();
