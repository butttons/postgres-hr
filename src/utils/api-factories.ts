import { Client, QueryResult } from 'pg';
import { Maybe, InformationSchema } from './@types-information';

const getArrayParams = (values: string[]) =>
    values.map((_, i) => `$${i + 1}`).join(', ');
const fetchRows = (result: QueryResult) => result.rows;
const catchError = (err: Error) => {
    console.warn('utilsFactory:', err);
    return null;
};
const selectWhereIn = (
    table: string,
    columns: string[],
    column: string,
    values: string[],
) => ({
    text: `SELECT ${columns.join(
        ',',
    )} FROM information_schema.${table} WHERE ${column} IN (${getArrayParams(
        values,
    )})`,
    values,
});
export interface TableInfo {
    tables: InformationSchema.Default.Table[];
    columns: InformationSchema.Default.Column[];
    triggers: InformationSchema.Default.Trigger[];
    routines: InformationSchema.Default.Routine[];
    roles: string[];
}
export interface GrantInfo {
    columnGrants: InformationSchema.Grants.Column[];
    objectGrants: InformationSchema.Grants.Usage[];
    routineGrants: InformationSchema.Grants.Routine[];
    tableGrants: InformationSchema.Grants.Table[];
}

const DEFAULT_TABLE_COLUMNS = ['table_schema', 'table_name'];
export const utilsFactory = (client: Client) => ({
    getGrants: async (
        grantees: string[],
        table: InformationSchema.TableNames.RoleGrants,
    ): Promise<Maybe<InformationSchema.AllGrants[]>> =>
        await client
            .query(selectWhereIn(table, ['*'], 'grantee', grantees))
            .then(fetchRows)
            .catch(catchError),
    allSchemas: async (): Promise<Maybe<string[]>> =>
        await client
            .query('SELECT schema_name FROM information_schema.schemata;')
            .then(fetchRows)
            .then((rows) => rows.map((r) => r.schema_name))
            .catch(catchError),
    allRoles: async (): Promise<Maybe<string[]>> =>
        await client
            .query('SELECT rolname FROM pg_roles')
            .then(fetchRows)
            .then((rows) => rows.map((r) => r.rolname))
            .catch(catchError),
    allTables: async (
        schemas: string[],
    ): Promise<Maybe<InformationSchema.Default.Table[]>> =>
        await client
            .query(
                selectWhereIn(
                    'tables',
                    [...DEFAULT_TABLE_COLUMNS, 'table_type'],
                    'table_schema',
                    schemas,
                ),
            )
            .then(fetchRows)
            .catch(catchError),
    allColumns: async (
        schemas: string[],
    ): Promise<Maybe<InformationSchema.Default.Column[]>> =>
        await client
            .query(
                selectWhereIn(
                    'columns',
                    [
                        ...DEFAULT_TABLE_COLUMNS,
                        'column_name',
                        'ordinal_position',
                        'column_default',
                        'is_nullable',
                        'data_type',
                        'dtd_identifier',
                        'is_identity',
                    ],
                    'table_schema',
                    schemas,
                ),
            )
            .then(fetchRows)
            .catch(catchError),
    allTriggers: async (
        schemas: string[],
    ): Promise<Maybe<InformationSchema.Default.Trigger[]>> =>
        await client
            .query(selectWhereIn('triggers', ['*'], 'trigger_schema', schemas))
            .then(fetchRows)
            .catch(catchError),
    allRoutines: async (
        schemas: string[],
    ): Promise<Maybe<InformationSchema.Default.Routine[]>> =>
        await client
            .query(
                selectWhereIn(
                    'routines',
                    [
                        'specific_name',
                        'routine_schema',
                        'routine_name',
                        'routine_type',
                        'data_type',
                    ],
                    'specific_schema',
                    schemas,
                ),
            )
            .then(fetchRows)
            .catch(catchError),
    allInfo: async (schemas: string[]): Promise<TableInfo> => {
        const {
            allColumns,
            allRoles,
            allTables,
            allTriggers,
            allRoutines,
        } = utilsFactory(client);
        const [columns, roles, tables, triggers, routines] = await Promise.all([
            allColumns(schemas),
            allRoles(),
            allTables(schemas),
            allTriggers(schemas),
            allRoutines(schemas),
        ]);
        return { columns, roles, tables, triggers, routines };
    },
    allGrants: async (grantees: string[]): Promise<GrantInfo> => {
        const { getGrants } = utilsFactory(client);
        const [
            columnGrants,
            objectGrants,
            routineGrants,
            tableGrants,
        ] = await Promise.all([
            getGrants(
                grantees,
                InformationSchema.TableNames.RoleGrants.COLUMN,
            ) as Promise<InformationSchema.Grants.Column[]>,
            getGrants(
                grantees,
                InformationSchema.TableNames.RoleGrants.OBJECT,
            ) as Promise<InformationSchema.Grants.Usage[]>,
            getGrants(
                grantees,
                InformationSchema.TableNames.RoleGrants.ROUTINE,
            ) as Promise<InformationSchema.Grants.Routine[]>,
            getGrants(
                grantees,
                InformationSchema.TableNames.RoleGrants.TABLE,
            ) as Promise<InformationSchema.Grants.Table[]>,
        ]);
        return { columnGrants, objectGrants, routineGrants, tableGrants };
    },
});
