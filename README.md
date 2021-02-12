# PostgresHR

[![npm](https://badgen.net/npm/v/postgres-hr)](https://www.npmjs.com/package/postgres-hr)

Manage Postgres roles in a sane way.

## Installation

```bash
npm i -g postgres-hr
```

![Example](https://i.imgur.com/bfDeBIP.png)

## Usage

```
postgres-hr
```

The UI will be available at http://localhost:9876
To run the interface at a different port, set the `PORT` environment variable.

```
PORT=1234 postgres-hr
```

1. Add a new connection.
2. Select it from top right dropdown.
3. Select the roles & schemas you want to work with.
4. Click away on the permissions on the column, table, etc under the roles.

-   Functions associated with a trigger will appear under that trigger.
-   Triggers associated with a table will appear under that table.

## Disclaimer

I made this over an year ago, and have been using it internally for my hobby projects. This is not intended to be used on production databases, please proceed with caution. Use this on a local copy and then `pg_dumpall --roles`.
Interface available here: https://github.com/butttons/postgres-hr-interface
