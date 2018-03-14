'use strict';

const Controller = require('egg').Controller;

class CurdController extends Controller {

  async index() {
    this.ctx.body = `simple curd api.`;
  }

  async select() {
    const { ctx, service, config } = this;
    let tbName = ctx.params.tableName;
    let pageIndex = ctx.params.pageIndex;
    let filter = ctx.query || {}
    filter.pageSize = filter.pageSize || config.pageSize;
    const data = await ctx.service.curd.select(tbName, pageIndex, filter);
    ctx.body = data;
  }

  async getById() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let id = ctx.params.id;
    let data = await ctx.service.curd.getById(tbName, id);
    ctx.body = data;
  }

  async del() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let id = ctx.params.id;
    let result = await ctx.service.curd.del(tbName, id);
    ctx.body = result;
  }

  async add() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let data = ctx.request.body;
    let result = await ctx.service.curd.add(tbName, data);
    ctx.body = result;
  }

  async update() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let data = ctx.request.body;
    let result = await ctx.service.curd.update(tbName, data);
    ctx.body = result;
  }
}

module.exports = CurdController;
