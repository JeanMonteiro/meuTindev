'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Like = use('App/Models/Like')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dev = use('App/Models/Dev')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Match = use('App/Models/Match')

const Database = use('Database')

const Ws = use('Ws')

class LikeController {

    /**
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * @param {View} ctx.view
    */
    async like({ request, response, view }) {
        const { user } = request.headers()
        const { id } = request.all()

        const loggedDev = await Dev.find(user)
        const otherDev = await Dev.find(id)

        await Like.create({
            id_dev_own: loggedDev.id,
            id_dev_ref: otherDev.id
        })

        const inverseLike = await Database.from('likes').where({
            id_dev_own: otherDev.id,
            id_dev_ref: loggedDev.id
        }).select('id')

        if (inverseLike && inverseLike.length) {
            await Match.create({
                id_dev_1: otherDev.id,
                id_dev_2: loggedDev.id
            })

            console.log('deu MATCH!!!');

            const channel = Ws.getChannel('match:*')
            if (!channel) return

            let topic = channel.topic(`match:${user}`)
            if (!topic) {
                console.error('Has no topic')
                return
            }

            topic.broadcastToAll(`message`, loggedDev);

            topic = channel.topic(`match:${id}`)
            if (!topic) {
                console.error('Has no topic')
                return
            }
            topic.broadcastToAll(`message`, otherDev);
        }
    }

    async teste({ request, response, view }) {
        const channel = Ws.getChannel('match:*')
        if (!channel) return

        const topic = channel.topic(`match:6`)
        if (!topic) {
            return
        }
        topic.broadcastToAll(`message`, {});

    }


}

module.exports = LikeController
