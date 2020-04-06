import { Router } from 'express';
import { utilsFactory } from '@/utils/api-factories';
import { clientFactory } from '@/utils/pg';
import { InformationSchema } from '@/utils/@types-information';
import { generateList } from '@/utils/generate-list';
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
    const { allInfo, allGrants } = utilsFactory(clientFactory());
    const { schemas, grantees } = req.body;
    const [info, grants] = await Promise.all([
        allInfo(schemas),
        allGrants(grantees),
    ]);

    const list = generateList(info, grants, grantees);
    res.json({ list });
});
