'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dislike = use('App/Models/Dislike')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dev = use('App/Models/Dev')

class DislikeController {

    /**
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  * @param {View} ctx.view
  */
    async dislike({ request, response, view }) {
        const { user } = request.headers()
        const { id } = request.all()

        const loggedDev = await Dev.find(user)
        const otherDev = await Dev.find(id)
        return Dislike.create({
            id_dev_own: loggedDev.id,
            id_dev_ref: otherDev.id
        })
    }
}

module.exports = DislikeController
