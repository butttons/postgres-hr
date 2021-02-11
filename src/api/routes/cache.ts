import { Router } from 'express';
import { cacheDb } from '@/utils/cache-db/lowdb';
import { ConnectionConfig } from 'pg';
import isEqual from 'lodash.isequal';
export const cache = Router();
import shortid from 'shortid';

const hasCachedConnection = (connection: ConnectionConfig) => {
    const connections = cacheDb.get('connections').value();
    const cachedConnection = Object.values(connections).find((c) =>
        isEqual(c, connection),
    );
    const hasConnection = cachedConnection !== undefined;
    return hasConnection;
};
const addConnection = (connection: ConnectionConfig) => {
    const connections = cacheDb.get('connections');
    const newId = shortid();
    connections.set(newId, connection).write();
    return newId;
};
const allConnections = () => cacheDb.get('connections').value();
const removeConnection = (connectionId: string) => {
    cacheDb.get('connections').unset(connectionId).write();
    cacheDb.set('currentConnection', null).write();
};

cache.get('/connections', (req, res) => {
    const connections = allConnections();
    res.json(connections);
});
cache.get('/current', (req, res) => {
    const currentId = cacheDb.get('currentConnection').value();
    res.json({ currentId });
});
cache.post('/newConnection', (req, res) => {
    const newConnection = req.body.connection;
    const hasConnection = hasCachedConnection(newConnection);
    if (!hasConnection) {
        addConnection(newConnection);
        const connections = allConnections();
        res.json({ connections, status: { success: true } });
        return;
    }
    const connections = allConnections();
    res.json({ connections, status: { success: true } });
});
cache.post('/removeConnection', (req, res) => {
    const connectionId = req.body.connectionId;
    removeConnection(connectionId);
    const connections = allConnections();
    res.json({ connections, status: { success: true } });
});
cache.post('/setConnection', (req, res) => {
    const connectionId = req.body.connectionId;
    cacheDb.set('currentConnection', connectionId).write();
    res.json({ connectionId });
});
