require('module-alias/register');

import { client } from '@/utils/pg';
import { utilsFactory } from './utils/factories';
import { InformationSchema } from './utils/@types-information';

(async () => {
    const availableSchemas = ['ecom_public', 'ecom_private'];
    // const qr = await client.query('SELECT * FROM pg_roles');
    const utils = utilsFactory(client);
    // const allRoles = await roleUtils.allRoles();
    const tableGrants = await utils.getGrants(
        ['ecom_admin', 'ecom_user', 'ecom_anon'],
        InformationSchema.TableNames.RoleGrants.OBJECT,
    );
    const allColumns = await utils.allRoutines(availableSchemas);
    console.log('allColumns:', tableGrants);
    process.exit();
})();
