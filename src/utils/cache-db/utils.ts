import { cacheDb } from './lowdb';
export const currentConnection = () => {
    const currentId = cacheDb.get('currentConnection').value();
    const connection = cacheDb
        .get('connections')
        .get(currentId)
        .value();
    return connection;
};
