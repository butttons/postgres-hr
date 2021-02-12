import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { ConnectionConfig } from 'pg';
import { getConfigHome } from 'platform-folders';

export interface CacheSchema {
    connections: Record<string, ConnectionConfig>;
    currentConnection: string;
}
const dbFilePath = resolve(getConfigHome(), 'postgres-hr.json');
const adapter = new FileSync<CacheSchema>(dbFilePath);
export const cacheDb = low(adapter);

cacheDb
    .defaults({
        connections: {},
        currentConnection: null,
    })
    .write();
