'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikeSchema extends Schema {
  up () {
    this.create('likes', (table) => {
      table.increments()
      table.integer('id_dev_own', 11).unsigned().references('id').inTable('devs')
      table.integer('id_dev_ref', 11).unsigned().references('id').inTable('devs')
      table.timestamps()
    })
  }

  down () {
    this.drop('likes')
  }
}

module.exports = LikeSchema
