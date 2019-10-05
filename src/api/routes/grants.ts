import { Router } from 'express';
import { utilsFactory } from '@/utils/factories';
import { client } from '@/utils/pg';
import { InformationSchema } from '@/utils/@types-information';

export const grants = Router();

grants.post('/', async (req, res) => {
    const { getGrants } = utilsFactory(client);
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
