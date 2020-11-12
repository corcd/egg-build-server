/*
 * @Author: Whzcorcd
 * @Date: 2020-08-10 11:35:45
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-12 18:13:03
 * @Description: file content
 */

'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  router.post('/webhook', controller.webhook.index)
  router.post('/webhook/task', controller.webhook.task)
  // router.post('/webhook/queue', controller.webhook.addNewTask)

  router.post('/trigger/single', controller.trigger.single)
  router.post('/trigger/queue', controller.trigger.queue)

  router.post('/project/create', controller.project.create)
  router.post('/project/add', controller.project.add)
  router.post('/project/pack', controller.project.pack)

  router.get('/test', controller.test.index)
}
