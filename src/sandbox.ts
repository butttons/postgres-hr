require('module-alias/register');

import { utilsFactory } from './utils/api-factories';
import { InformationSchema } from './utils/@types-information';
import { cacheDb } from '@/utils/cache-db/lowdb';
import { schemaGen } from '@/utils/knex/schema';
(async () => {
    await schemaGen().catch((e) => {
        console.log(e);
    });
    //console.log(cacheDb);

    /* const availableSchemas = ['ecom_public', 'ecom_private'];
    const utils = utilsFactory(client);
    const tableGrants = await utils.getGrants(
        ['ecom_admin', 'ecom_user', 'ecom_anon'],
        InformationSchema.TableNames.RoleGrants.OBJECT,
    );
    const allColumns = await utils.allRoutines(availableSchemas);
    process.exit(); */
})();
