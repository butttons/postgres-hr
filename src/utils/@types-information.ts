export type Maybe<T> = T | null;
interface BaseGrant {
    grantor: string;
    grantee: string;
    privilege_type: string;
    is_grantable: InformationSchema.Types.YesOrNo;
}
export module InformationSchema {
    // Table names of relevant tables that we need.
    export module TableNames {
        export const enum RoleGrants {
            COLUMN = 'column_privileges',
            ROUTINE = 'routine_privileges',
            TABLE = 'table_privileges',
            OBJECT = 'usage_privileges',
        }
        export const enum InfoTables {
            TABLE = 'tables',
            COLUMN = 'columns',
            TRIGGER = 'triggers',
        }
    }
    // Possible privileges on each type of entity.
    export module Privileges {
        export type Column = 'SELECT' | 'INSERT' | 'UPDATE' | 'REFERENCES';
        export type Routine = 'EXECUTE';
        export type Table =
            | 'SELECT'
            | 'INSERT'
            | 'UPDATE'
            | 'DELETE'
            | 'TRUNCATE'
            | 'REFERENCES'
            | 'TRIGGER';
        export type Usage = 'USAGE';
    }
    // Possible data types of each entity.
    export module Types {
        export type YesOrNo = 'YES' | 'NO';
        export type Trigger = 'INSERT' | 'UPDATE' | 'DELETE';
        export type Routine = 'FUNCTION' | 'PROCEDURE';
        export type Object =
            | 'COLLATION'
            | 'DOMAIN'
            | 'FOREIGN DATA WRAPPER'
            | 'FOREIGN SERVER'
            | 'SEQUENCE';
    }
    // The shape of the default tables we need to query.
    export module Default {
        export interface Table {
            table_schema: string;
            table_name: string;
            table_type: string;
        }
        export interface Column {
            table_schema: string;
            table_name: string;
            column_name: string;
            ordinal_position: number;
            column_default: string;
            is_nullable: Types.YesOrNo;
            data_type: string;
            is_identity: Types.YesOrNo;
        }
        export interface Trigger {
            trigger_catalog: string;
            trigger_schema: string;
            trigger_name: string;
            event_manipulation: Types.Trigger;
            event_object_catalog: string;
            event_object_schema: string;
            event_object_table: string;
            action_order: number;
            action_condition: string;
            action_statement: string;
            action_orientation: string;
            action_timing: string;
            action_reference_old_table: Maybe<string>;
            action_reference_new_table: Maybe<string>;
            action_reference_old_row: null;
            action_reference_new_row: null;
            created: null;
        }
        export interface Routine {
            specific_schema: string;
            routine_schema: string;
            routine_name: string;
            routine_type: Types.Routine;
            data_type: string;
        }
    }
    // The shape of the grants table which give information regarding privileges of each entity.
    export module Grants {
        export interface Column extends BaseGrant {
            table_catalog: string;
            table_schema: string;
            table_name: string;
            column_name: string;
            privilege_type: Privileges.Column;
        }
        export interface Routine extends BaseGrant {
            specific_catalog: string;
            specific_schema: string;
            specific_name: string;
            routine_catalog: string;
            routine_schema: string;
            routine_name: string;
            privilege_type: Privileges.Routine;
        }
        export interface Table extends BaseGrant {
            table_catalog: string;
            table_schema: string;
            table_name: string;
            with_hierarchy: string;
            privilege_type: Privileges.Table;
        }
        export interface Usage extends BaseGrant {
            object_catalog: string;
            object_schema: string;
            object_name: string;
            object_type: Types.Object;
            privilege_type: Privileges.Usage;
        }
    }
    export type AllGrants =
        | Grants.Column
        | Grants.Routine
        | Grants.Table
        | Grants.Usage;
}
