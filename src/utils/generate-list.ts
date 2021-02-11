import { TableInfo, GrantInfo } from './api-factories';
import { InformationSchema } from './@types-information';

export type EntityGrant = Record<string, string[]>;
export const enum EntityTypes {
    TABLE = 'table',
    COLUMN = 'column',
    ROUTINE = 'routine',
    OBJECT = 'object',
    TRIGGER = 'trigger',
}
const filters = {
    columns: (t: InformationSchema.Default.Table) => (
        c: InformationSchema.Default.Column,
    ) => c.table_name === t.table_name && c.table_schema === t.table_schema,
    tableGrants: (t: InformationSchema.Default.Table) => (
        tg: InformationSchema.Grants.Table,
    ) => tg.table_name === t.table_name && tg.table_schema === t.table_schema,
};
const labels = {
    table: (t: InformationSchema.Default.Table) =>
        `${t.table_schema}.${t.table_name}`,
};

interface EntityRow {
    type: EntityTypes;
    level: number;
    label: string;
    grants: EntityGrant;
    meta?: any;
}
const entityRow = (
    type: EntityTypes,
    label: string,
    grants: EntityGrant,
    level: number | null = null,
    meta?: any[],
): EntityRow => {
    const entityLevels = new Map([
        [EntityTypes.TABLE, 0],
        [EntityTypes.COLUMN, 1],
        [EntityTypes.ROUTINE, 2],
        [EntityTypes.TRIGGER, 1],
        [EntityTypes.OBJECT, 1],
    ]);
    return {
        type,
        label,
        grants,
        meta,
        level: level === null ? entityLevels.get(type)! : level,
    };
};
export const generateList = async (
    info: TableInfo,
    grants: GrantInfo,
    grantees: string[],
) => {
    const maps = {
        [EntityTypes.TABLE]: {},
    };
    /* const result = info.tables.reduce((res, table) => {
        const { table_name, table_schema } = table;
        const columns = info.columns.filter(filters.columns(table));

        const tableGrants = grants.tableGrants
            .filter(filters.tableGrants(table))
            .reduce((acc, tg) => {
                console.log(tg);
                const grants = grantees.reduce((tacc, g) => {
                    tacc[g] = 
                    return tacc;
                }, {})
                const row = entityRow(EntityTypes.TABLE, labels.table, )
                return acc;
            }, {});
        console.log('tableGrants:', tableGrants);

        // acc.push(entityRow(EntityTypes.TABLE, labels.table(table), ));
        return res;
    }, []); */
};
