import { Router } from 'express';
import { utilsFactory } from '@/utils/api-factories';
import { clientFactory } from '@/utils/pg';

export const info = Router();

info.post('/', async (req, res) => {
    const {
        allColumns,
        allRoles,
        allTables,
        allTriggers,
        allRoutines,
    } = utilsFactory(clientFactory());
    const schemas = req.body.schemas;
    const [columns, roles, tables, triggers, routines] = await Promise.all([
        allColumns(schemas),
        allRoles(),
        allTables(schemas),
        allTriggers(schemas),
        allRoutines(schemas),
    ]);
    res.json({
        columns,
        roles,
        tables,
        triggers,
        routines,
    });
});
info.get('/init', async (req, res) => {
    const { allSchemas, allRoles } = utilsFactory(clientFactory());
    const [schemas, roles] = await Promise.all([allSchemas(), allRoles()]);
    res.json({
        schemas,
        roles,
    });
});

info.post('/query', async (req, res) => {
    const query = req.body.sql;
    const client = clientFactory();
    await client.query(query);
    res.send({ success: true });
});
