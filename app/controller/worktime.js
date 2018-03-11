'use strict';

const Controller = require('egg').Controller;

class WorkTimeController extends Controller {

  async index() {
    this.ctx.body = 'hi, worktime';
  }

  /** 
   * 分页查询工时数据
   */
  async select() {
    const { ctx, service, config } = this;
    let pageIndex = ctx.params.pageIndex
    let pageSize = ctx.params.pageSize || config.pageSize
    const worktimes = await ctx.service.worktime.findAll(pageIndex, pageSize);
    ctx.body = worktimes
  }

  async add() {
    const { ctx, service } = this;
    let worktime = {};
    let startTime = new Date();
    let endTime = new Date(Date.now() + 3600000)
    worktime.start_time = startTime
    worktime.end_time = endTime
    worktime.year = startTime.getFullYear();
    worktime.month = startTime.getMonth() + 1
    worktime.duration = (endTime - startTime) / (1000 * 60)
    const result = await ctx.service.worktime.add(worktime);

    if (result) {
      ctx.body = { code: 0, data: result.insertId }
    } else {
      ctx.body = { code: 500, data: '添加工时失败！' }
    }
  }

  async del() {
    const { ctx, service } = this;
    let id = ctx.query.id
    const result = await ctx.service.worktime.del(id);
    if (result) {
      ctx.body = { code: 0, data: result.insertId }
    } else {
      ctx.body = { code: 500, data: '删除工时失败！' }
    }
  }
}

module.exports = WorkTimeController;
