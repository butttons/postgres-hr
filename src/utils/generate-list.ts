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
};
