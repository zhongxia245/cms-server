'use strict';

const Controller = require('egg').Controller;

class CurdController extends Controller {
  async index() {
    this.ctx.body = 'simple curd api.';
  }

  async select() {
    const { ctx, config } = this;
    const tbName = ctx.params.tableName;
    const pageIndex = ctx.params.pageIndex;
    const filter = ctx.query || {};
    filter.pageSize = filter.pageSize || config.pageSize;
    const data = await ctx.service.curd.select(tbName, pageIndex, filter);
    ctx.body = data;
  }

  async getById() {
    const { ctx } = this;
    const tbName = ctx.params.tableName;
    const id = ctx.params.id;
    const data = await ctx.service.curd.getById(tbName, id);
    ctx.body = data;
  }

  async del() {
    const { ctx } = this;
    const tbName = ctx.params.tableName;
    const id = ctx.params.id;
    const result = await ctx.service.curd.del(tbName, id);
    ctx.body = result;
  }

  async add() {
    const { ctx } = this;
    const tbName = ctx.params.tableName;
    const data = ctx.request.body;
    const result = await ctx.service.curd.add(tbName, data);
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const tbName = ctx.params.tableName;
    const data = ctx.request.body;
    const result = await ctx.service.curd.update(tbName, data);
    ctx.body = result;
  }
}

module.exports = CurdController;
