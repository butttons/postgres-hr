import { cacheDb } from './lowdb';
export const currentConnectionConfig = () => {
    const currentId = cacheDb.get('currentConnection').value();
    const config = cacheDb.get('connections').get(currentId).value();
    return { config, currentId };
};
