import { db } from './connection';

const enum Schemas {
    PUBLIC = 'db_public',
    PRIVATE = 'db_private',
}

export const schemaGen = async () => {
    const { schema } = db;
    await schema.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await schema
        .withSchema(Schemas.PUBLIC)
        .hasTable('user')
        .then(async (has) => {
            if (!has) {
                await schema.createTable('user', (table) => {
                    table
                        .uuid('id')
                        .primary()
                        .defaultTo(db.raw('uuid_generate_v4()'));
                    table.string('name');
                    table.date('date_of_birth');
                    table.timestamps(true, true);
                });
            }
        });
    await schema
        .withSchema(Schemas.PUBLIC)
        .hasTable('post')
        .then(async (has) => {
            if (!has) {
                await schema.createTableIfNotExists('post', (table) => {
                    table
                        .uuid('id')
                        .primary()
                        .defaultTo(db.raw('uuid_generate_v4()'));
                    table
                        .uuid('user_id')
                        .references('id')
                        .inTable('db_public.user');
                    table.string('title');
                    table.string('description');
                    table.timestamps(true, true);
                });
            }
        });
};
