/*
 * @Author: Whzcorcd
 * @Date: 2020-08-16 11:44:34
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2020-11-13 09:10:51
 * @Description: file content
 */

'use strict'

const Controller = require('egg').Controller

class TriggerController extends Controller {
  async single() {
    const { ctx } = this

    const rule = {
      solutions: { type: 'string', required: true },
      name: { type: 'string', required: true },
      url: { type: 'string', required: true },
      branch: { type: 'string', required: false },
    }

    try {
      ctx.validate(rule, ctx.request.body)
    } catch (err) {
      ctx.logger.warn(err.errors)
      ctx.returnCtxBody(400, {}, 'illegal parameters')
      return
    }

    const { solutions, name, url, branch } = ctx.request.body
    const preload = {
      repository: {
        name,
        git_http_url: url,
        branch: branch || 'master',
      },
    }

    try {
      await ctx.service.webhook.addNewTask(solutions, preload)
    } catch (err) {
      return ctx.returnCtxBody(500, { err }, 'success')
    }
    return ctx.returnCtxBody(200, {}, 'success')
  }

  async queue() {
    const { ctx } = this

    // const rule = {
    //   tasks: { type: 'array', required: true },
    // }

    // try {
    //   ctx.validate(rule, ctx.request.body)
    // } catch (err) {
    //   ctx.logger.warn(err.errors)
    //   ctx.returnCtxBody(400, {}, 'illegal parameters')
    //   return
    // }

    const { solutions, tasks } = ctx.request.body

    const preload = tasks.map(item => {
      return {
        repository: {
          name: item.name,
          git_http_url: item.url,
          branch: item.branch || 'master',
        },
      }
    })

    console.log(preload)

    try {
      await ctx.service.webhook.addNewTask(solutions, preload)
    } catch (err) {
      return ctx.returnCtxBody(500, { err }, 'success')
    }
    return ctx.returnCtxBody(200, {}, 'success')
  }
}

module.exports = TriggerController
