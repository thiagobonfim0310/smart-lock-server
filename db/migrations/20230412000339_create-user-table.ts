import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.json('keys')
    table.string('type')
    table.json('acess')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
}
