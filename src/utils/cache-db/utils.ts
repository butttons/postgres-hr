import { cacheDb } from './lowdb';
export const currentConnectionConfig = () => {
    const id = cacheDb.get('currentConnection').value();
    const config = cacheDb.get('connections').get(id).value();
    return { config, id };
};
