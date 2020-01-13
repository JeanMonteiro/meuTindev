'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DevSchema extends Schema {
  up () {
    this.create('devs', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('user').notNullable()
      table.string('bio')
      table.string('avatar')
      table.timestamps()
    })
  }

  down () {
    this.drop('devs')
  }
}

module.exports = DevSchema
