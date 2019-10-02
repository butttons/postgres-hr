import { Client } from 'pg';

const getArrayParams = (values: string[]) =>
    values.map((_, i) => `$${i + 1}`).join(', ');

export const enum RoleGrants {
    COLUMN = 'column_privileges',
    FUNCTION = 'routine_privileges',
    TABLE = 'table_privileges',
    OBJECT = 'usage_privileges',
}

export const utilsFactory = (client: Client) => ({
    getGrants: async (grantee: string[], table?: RoleGrants) =>
        await client
            .query({
                text: `SELECT * FROM information_schema.${table} AS r WHERE r.grantee IN (${getArrayParams(
                    grantee,
                )})`,
                values: grantee,
            })
            .then((result) => result.rows)
            .catch((e) => null),
    allRoles: async () =>
        await client
            .query('SELECT rolname FROM pg_roles')
            .then((result) => result.rows.map((r) => r.rolname))
            .catch((e) => null),
    allTables: async () =>
        await client
            .query({
                text:
                    'SELECT * FROM information_schema.tables WHERE table_schema NOT LIKE $1',
                values: ['pg_%'],
            })
            .then((result) => result.rows)
            .catch((e) => null),
});
