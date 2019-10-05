import { Router } from 'express';
import { utilsFactory } from '@/utils/factories';
import { client } from '@/utils/pg';

export const info = Router();

info.post('/', async (req, res) => {
    const {
        allColumns,
        allRoles,
        allTables,
        allTriggers,
        allRoutines,
    } = utilsFactory(client);
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
