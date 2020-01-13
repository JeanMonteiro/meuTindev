'use strict'

const axios = require('axios')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Dev = use('App/Models/Dev')

const Database = use('Database')

class DevController {
    /**
    * Show a list of all clients.
    * GET clients
    *
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Response} ctx.response
    * @param {View} ctx.view
    */
    async index({ request, response, view }) {
        const { user } = request.headers()

        const loggedDev = await Dev.find(user)

        const devs = await Database.select('devs.*').distinct('devs.id').from('devs')
            .leftOuterJoin('likes', 'devs.id', '=', 'likes.id_dev_own')
            .leftOuterJoin('dislikes', 'devs.id', '=', 'dislikes.id_dev_own')
            .whereRaw(
                'devs.id != ?' +  
                ' AND devs.id not in ( select id_dev_ref from likes where likes.id_dev_own = ?)' + 
                ' AND devs.id not in ( select id_dev_ref from dislikes where dislikes.id_dev_own = ?)'
                 , [loggedDev.id, loggedDev.id, loggedDev.id]
            )
        return devs
    }

    /**
   * 
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async login({ request, response, view }) {
        const { username } = request.all()
        let dev = await Dev.findBy('user', username)
        let githubRes = null;
        if (dev)
            return dev
        try {
            githubRes = await axios.get(`https://api.github.com/users/${username}`)
        } catch (error) {
            console.log(error);
        }
        const { name, bio, avatar_url: avatar } = githubRes.data

        dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        console.log(`User ${username} created.`)
        return response.json(dev)
    }
}

module.exports = DevController
