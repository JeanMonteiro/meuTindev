'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments()
      table.integer('id_dev_1', 11).unsigned().references('id').inTable('devs')
      table.integer('id_dev_2', 11).unsigned().references('id').inTable('devs')
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = MatchSchema
