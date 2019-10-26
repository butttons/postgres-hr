import { Router } from 'express';
import { utilsFactory } from '@/utils/api-factories';
import { client, clientFactory } from '@/utils/pg';
import { InformationSchema } from '@/utils/@types-information';

export const grants = Router();

grants.post('/', async (req, res) => {
    const { getGrants } = utilsFactory(clientFactory());
    const grantees = req.body.grantees;
    const [columns, objects, routines, tables] = await Promise.all([
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.COLUMN),
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.OBJECT),
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.ROUTINE),
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.TABLE),
    ]);

    res.json({
        columns,
        objects,
        routines,
        tables,
    });
});
grants.post('/list', async (req, res) => {
    const {
        getGrants,
        allColumns,
        allRoles,
        allTables,
        allTriggers,
        allRoutines,
    } = utilsFactory(clientFactory());
    const { schemas, grantees } = req.body;
    const [columns, roles, tables, triggers, routines] = await Promise.all([
        allColumns(schemas),
        allRoles(),
        allTables(schemas),
        allTriggers(schemas),
        allRoutines(schemas),
    ]);
    const [
        columnGrants,
        objectGrants,
        routineGrants,
        tableGrants,
    ] = await Promise.all([
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.COLUMN),
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.OBJECT),
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.ROUTINE),
        getGrants(grantees, InformationSchema.TableNames.RoleGrants.TABLE),
    ]);

    res.json({
        columns,
        roles,
        tables,
        triggers,
        routines,
    });
});
