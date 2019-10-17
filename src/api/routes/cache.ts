import { Router } from 'express';
import { cacheDb } from '@/utils/cache-db/lowdb';
import { ConnectionConfig } from 'pg';
import isEqual from 'lodash.isequal';
export const cache = Router();
import shortid from 'shortid';

const hasCachedClient = (client: ConnectionConfig) => {
    const clients = cacheDb.get('clients').value();
    const cachedClient = Object.entries(clients).find((c) =>
        isEqual(c[1], client),
    );
    const hasClient = cachedClient !== undefined;
    const clientId = hasClient ? cachedClient[0] : null;
    return [hasClient, clientId];
};
const addClient = (client: ConnectionConfig) => {
    const clients = cacheDb.get('clients');
    const newId = shortid();
    // @ts-ignore
    clients.set(newId, client).write();
    return newId;
};

cache.get('/clients', (req, res) => {
    const clients = cacheDb.get('clients').value();
    res.json(clients);
});
cache.get('/current', (req, res) => {
    const currentId = cacheDb.get('currentClient').value();
    const cachedClients = cacheDb.get('clients').value();
    if (currentId in cachedClients) {
        res.json(cachedClients[currentId]);
    } else {
        res.json({ notCached: true });
    }
});
cache.post('/client', (req, res) => {
    const newClient = req.body.client;
    const [hasClient, clientId] = hasCachedClient(newClient);
    if (!hasClient) {
        const clientId = addClient(newClient);
        cacheDb.set('currentClient', clientId).write();
        res.json({ clientId });
        return;
    }
    cacheDb.set('currentClient', clientId).write();
    res.json({ clientId });
});
