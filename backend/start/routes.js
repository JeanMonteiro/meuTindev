'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('', 'DevController.index')
  Route.post('', 'DevController.login')
}).prefix('/devs')

Route.group(() => {
  Route.post('', 'LikeController.like')
  Route.post('/teste', 'LikeController.teste')
}).prefix('/likes')

Route.group(() => {
  Route.post('', 'DislikeController.dislike')
}).prefix('/dislikes')




Route.get('/', () => {
  return { greeting: 'Welcome to MeuTindev' }
})
