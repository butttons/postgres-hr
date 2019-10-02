require('module-alias/register');

import { client } from '@/utils/pg';
import { utilsFactory, RoleGrants } from './utils/factories';

(async () => {
    // const qr = await client.query('SELECT * FROM pg_roles');
    /* const utils = utilsFactory(client);
    // const allRoles = await roleUtils.allRoles();
    const tableGrants = await utils.getGrants(
        ['ecom_admin', 'ecom_user', 'ecom_anon'],
        RoleGrants.TABLE,
    );
    console.log('tableGrants:', tableGrants);
    return; */
    const qr = await client.query({
        text:
            'SELECT * FROM information_schema.columns WHERE table_schema IN ($1, $2)',
        values: ['ecom_public', 'ecom_private'],
    });
    console.log('qr:', qr.rows);
    process.exit();
})();
